// filepath: c:\Users\bhard\Desktop\Retail-Automation-Platform\src\routes\print-bill.jsx
import React, { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import '../styles/theme.css'; // Assuming you have a theme file
import './print-bill.css'; // We'll create this for bill-specific styles

const PrintBill = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const billDetails = location.state?.bill; // Get bill data from route state
  const billRef = useRef();

  if (!billDetails) {
    return (
      <div className="container">
        <h2>Error</h2>
        <p>No bill data found. Please perform a purchase first.</p>
        <button onClick={() => navigate('/cashier-dashboard/perform-purchase')}>
          Go to Purchase Page
        </button>
      </div>
    );
  }

  const { bill_id, bill_date, items, grand_total } = billDetails;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    const input = billRef.current;
    if (!input) {
      console.error("Bill content ref is not available.");
      // Optionally, show an error message to the user if this happens
      return;
    }

    html2canvas(input, {
      scale: 2, // Increase scale for better quality
      useCORS: true, // Enable cross-origin images if any (though unlikely for a bill)
      scrollY: -window.scrollY, // Capture from the top of the viewport
      // Provide window context to html2canvas for more consistent rendering
      windowWidth: document.documentElement.offsetWidth,
      windowHeight: document.documentElement.offsetHeight,
    })
      .then((canvas) => { // 'canvas' is the full-height canvas from html2canvas
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4',
        });

        const pdfInternalPageSize = pdf.internal.pageSize;
        const pdfWidth = pdfInternalPageSize.getWidth();
        const pdfHeight = pdfInternalPageSize.getHeight();
        const margin = 10; // 10mm margin on all sides

        // Usable width and height on the PDF page after accounting for margins
        const contentWidthOnPdf = pdfWidth - (2 * margin);
        const contentHeightOnPdfPage = pdfHeight - (2 * margin);

        // Source canvas dimensions (from html2canvas output)
        const sourceCanvasWidth = canvas.width;
        const sourceCanvasHeight = canvas.height;

        // Calculate the total height the bill image would occupy on the PDF
        // if it were scaled to fit the contentWidthOnPdf
        const totalBillImageHeightOnPdf = (sourceCanvasHeight * contentWidthOnPdf) / sourceCanvasWidth;

        if (totalBillImageHeightOnPdf <= contentHeightOnPdfPage) {
          // Content fits on a single page
          const imgData = canvas.toDataURL('image/png');
          pdf.addImage(imgData, 'PNG', margin, margin, contentWidthOnPdf, totalBillImageHeightOnPdf);
        } else {
          // Content needs to be split across multiple pages
          // Calculate the height of one PDF page's content area in terms of source canvas pixels
          // This is how many pixels from the source canvas fit onto one PDF page vertically
          const sliceHeightInPixels = (contentHeightOnPdfPage * sourceCanvasWidth) / contentWidthOnPdf;
          
          let yOffsetInSource = 0; // Current y position in the source canvas we are slicing from
          let pageNum = 0;

          while (yOffsetInSource < sourceCanvasHeight) {
            if (pageNum > 0) { // Add a new page for subsequent slices
              pdf.addPage();
            }

            const remainingSourceHeight = sourceCanvasHeight - yOffsetInSource;
            // Determine the height of the current slice from the source canvas
            const currentSliceHeightInSource = Math.min(sliceHeightInPixels, remainingSourceHeight);

            // Create a temporary canvas to hold the current page's slice
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = sourceCanvasWidth;
            tempCanvas.height = currentSliceHeightInSource;
            const tempCtx = tempCanvas.getContext('2d');

            // Draw the slice from the source (html2canvas'd) canvas to the temporary canvas
            tempCtx.drawImage(
              canvas, // The source canvas from html2canvas
              0, // sx: source x-coordinate (start from left edge)
              yOffsetInSource, // sy: source y-coordinate (where to start slicing from the big canvas)
              sourceCanvasWidth, // sWidth: width of the slice from the big canvas
              currentSliceHeightInSource, // sHeight: height of the slice from the big canvas
              0, // dx: destination x-coordinate on tempCanvas (draw at top-left)
              0, // dy: destination y-coordinate on tempCanvas (draw at top-left)
              sourceCanvasWidth, // dWidth: draw width on tempCanvas (same as slice width)
              currentSliceHeightInSource // dHeight: draw height on tempCanvas (same as slice height)
            );
            
            const pageImgData = tempCanvas.toDataURL('image/png'); // Get image data for the current slice
            
            // Calculate the height this slice will occupy on the PDF page
            // This should be contentHeightOnPdfPage, unless it's the last page and the slice is shorter
            const sliceImgHeightOnPdf = (currentSliceHeightInSource * contentWidthOnPdf) / sourceCanvasWidth;

            pdf.addImage(pageImgData, 'PNG', margin, margin, contentWidthOnPdf, sliceImgHeightOnPdf);
            
            yOffsetInSource += currentSliceHeightInSource; // Move to the next slice position
            pageNum++;
          }
        }
        pdf.save(`bill-${bill_id || 'current'}.pdf`);
      })
      .catch((err) => {
        console.error("Error generating PDF:", err);
        // Optionally, display an error message to the user in the UI
      });
  };
  
  // Format date for display
  const formattedBillDate = new Date(bill_date).toLocaleString();

  return (
    <div className="container print-bill-container">
      <div className="bill-actions">
        <button onClick={handlePrint} className="btn-primary">Print Bill</button>
        <button onClick={handleDownloadPDF} className="btn-secondary">Download PDF</button>
        <button onClick={() => navigate('/cashier-dashboard/perform-purchase')} className="btn-secondary">
          New Purchase
        </button>
      </div>

      <div ref={billRef} className="bill-content">
        <header className="bill-header">
          <h1>Invoice / Bill</h1>
          <div className="store-details">
            <p><strong>Retail Automation Platform</strong></p>
            <p>Central University of Himachal Pradesh</p>
            <p>Phone: 01892228701</p>
          </div>
        </header>

        <section className="bill-info">
          <p><strong>Bill ID:</strong> {bill_id || 'N/A'}</p>
          <p><strong>Date:</strong> {formattedBillDate}</p>
        </section>

        <section className="bill-items">
          <h2>Items Purchased</h2>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price per Unit</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item.transaction_id || index}>
                  <td>{index + 1}</td>
                  <td>{item.product_name}</td>
                  <td>{item.quantity}</td>
                  <td>₹{Number(item.price_per_unit).toFixed(2)}</td>
                  <td>₹{Number(item.total_price_for_item).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="bill-summary">
          <p><strong>Grand Total: ₹{Number(grand_total).toFixed(2)}</strong></p>
        </section>

        <footer className="bill-footer">
          <p>Thank you for your purchase!</p>
          <p>Please visit us again.</p>
        </footer>
      </div>
    </div>
  );
};

export default PrintBill;
