import React, { useState } from "react";

function DataForm() {
  const [email, setEmail] = useState("asdf@asdf.com");

  return (
    <form>
      <h3>Enter Data</h3>

      <div data-testid="image wrapper">
        <img alt="data" src="data.jpg" />
      </div>

      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="color">Color</label>
      <input type="text" id="color" placeholder="Red" />

      <button title="Click when ready to submit">Submit</button>
    </form>
  );
}

export default DataForm;
