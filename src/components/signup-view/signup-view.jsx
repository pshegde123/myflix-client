import{ useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };

    fetch("https://myflix-ph-1e58a204d843.herokuapp.com/users/adduser", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => {
      if (response.ok) {
        alert("Signup successful");
        window.location.reload();
      } else {
        alert("Signup failed");
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit} className="mt-4">
      <Row>
        <h3>Sign-Up:</h3>
      </Row>
      <Row>
        <Col className="md-6 border border-5 justify-content-center">
          <Form.Group controlId="formUsername">
          <Form.Label className="w-100">
            Username:
            <input
              type="text"
              className="w-100"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength="3"
            />
          </Form.Label>
        </Form.Group>
        
          <Form.Group controlId="formPassword">
          <Form.Label className="w-100">
            Password:
            <input
              type="password"
              className="w-100"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Label>
        </Form.Group>
        
          <Form.Group controlId="formEmail">
            <Form.Label className="w-100">
              Email:    
              <input
                type="email"
                className="w-100"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Label>
          </Form.Group>
        
            <Form.Group controlId="formBirthdate">
              <Form.Label className="w-100">
                Birthday:
                <input
                  type="date"
                  className="w-100"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  required
                />
              </Form.Label>
          </Form.Group>
          <div>
          <Button variant="primary" type="submit" className="mt-4 mb-4 w-100">Submit</Button>
          </div>          
          </Col>
      </Row>            
            
    </Form>
  );
};