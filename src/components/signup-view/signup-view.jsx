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
    <Form onSubmit={handleSubmit}>
      <Row>
        <h3>Sign-Up:</h3>
      </Row>
      <Row>
        <Col md={6}>
          <Form.Group controlId="formUsername">
          <Form.Label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength="3"
            />
          </Form.Label>
        </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="formPassword">
          <Form.Label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Label>
        </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="formEmail">
            <Form.Label>
              Email:    
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Label>
          </Form.Group>
        </Col>
        <Col md={6}>
            <Form.Group controlId="formBirthdate">
              <Form.Label>
                Birthday:
                <input
                  type="date"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  required
                />
              </Form.Label>
          </Form.Group>
          </Col>
      </Row>            
      <Col md={12}>
        <Button variant="primary" type="submit">Submit</Button>
      </Col>           
    </Form>
  );
};