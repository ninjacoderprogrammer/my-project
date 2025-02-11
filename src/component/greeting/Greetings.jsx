import React, { useState } from "react";

const Greetings = ({ name, message, hobbies }) => {
  // Step 1: Create state for inputs
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setNumber] = useState("");
  const [password, setPassword] = useState("");

  // State variables for warnings separately
  const [nameWarning, setNameWarning] = useState("");
  const [emailWarning, setEmailWarning] = useState("");
  const [phoneNumberWarning, setPhoneNumberWarning] = useState("");
  const [passwordWarning, setPasswordWarning] = useState("");

  // State to store submitted data
  const [submittedName, setSubmittedName] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [submittedNumber, setSubmittedNumber] = useState("");
  const [submittedPassword, setSubmittedPassword] = useState("");

  // Step 2: Handle input changes
  const handleNameChange = (event) => {
    const value = event.target.value;
    if (value.length > 20) {
      setNameWarning("⚠️ Username cannot exceed 20 characters!");
    } else {
      setNameWarning("");
      setUserName(value);
    }
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    if (value.length > 50) {
      setEmailWarning("⚠️ Email cannot exceed 50 characters!");
    } else {
      setEmailWarning("");
      setEmail(value);
    }
  };

  const handleNumberChange = (event) => {
    const value = event.target.value;
    if (value.length > 10) {
      setPhoneNumberWarning("⚠️ Phone number cannot exceed 10 characters!");
    } else {
      setPhoneNumberWarning("");
      setNumber(value);
    }
  };

  // Password validation function
  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
    if (!/^(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/.test(value)) {
      setPasswordWarning(
        "⚠️ Password must be at least 8 characters long, contain at least one number, and one special character!"
      );
    } else {
      setPasswordWarning("");
    }
  };

  // Step 3: Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent page reload

    // Store submitted data
    setSubmittedName(userName);
    setSubmittedEmail(email);
    setSubmittedNumber(phoneNumber);
    setSubmittedPassword(password);

    // Clear input fields after submission
    setUserName("");
    setEmail("");
    setNumber("");
    setPassword("");
  };

  // Reset function to clear submitted data
  const handleReset = (event) => {
    setSubmittedName("");
    setSubmittedEmail("");
    setSubmittedNumber("");
    setSubmittedPassword("");
  };

  return (
    <div>
      <h2>Hello, {name}!</h2>
      <p>{message}</p>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          value={userName}
          onChange={handleNameChange}
          maxLength={20}
          required
        />
        {nameWarning && <p style={{ color: "red" }}>{nameWarning}</p>}

        <br />
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleEmailChange}
          maxLength={50}
          required
        />
        {emailWarning && <p style={{ color: "red" }}>{emailWarning}</p>}

        <br />
        <input
          type="number"
          placeholder="Enter your phone no."
          value={phoneNumber}
          onChange={handleNumberChange}
          maxLength={10}
          required
        />
        {phoneNumberWarning && <p style={{ color: "red" }}>{phoneNumberWarning}</p>}

        <br />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={handlePasswordChange}
          minLength={8}
          required
        />
        {passwordWarning && <p style={{ color: "red" }}>{passwordWarning}</p>}
        <br />

        <button type="submit" disabled={!!passwordWarning}>
          Submit
        </button>
      </form>

      {/* Show submitted data only after submission */}
      {submittedName && (
        <div>
          <h3>Submitted Data:</h3>
          <p>Your username: {submittedName}</p>
          <p>Your email: {submittedEmail}</p>
          <p>Your phone: {submittedNumber}</p>
          <p>Your password: {submittedPassword}</p>
        </div>
      )}

      {/* Reset button */}
      {submittedName && <button onClick={handleReset}>Reset</button>}

      {/* Display hobbies */}
      <h3>My Hobbies:</h3>
      <ul>
        {hobbies.map((hobby, index) => (
          <li key={index}>{hobby}</li>
        ))}
      </ul>
    </div>
  );
};

export default Greetings;
