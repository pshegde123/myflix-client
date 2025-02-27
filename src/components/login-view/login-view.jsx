import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="bg-dark text-white" closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Error
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>        
        <p>
          Invalid login ID/password
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [modalShow, setModalShow] = useState(false);

  const handleSubmit = (event) => {
    // this prevents the default behavior of the form which is to reload the entire page
    event.preventDefault();

    const data = {
        Username: username,
        Password: password
    };

    fetch("https://myflix-ph-1e58a204d843.herokuapp.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then((response) => response.json())
        .then((data) => {
          //console.log("Login response: ", data);
          if (data.user) {
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("token", data.token);            
            onLoggedIn(data.user, data.token);
          } else {
            //alert("No such user");
            setModalShow(true);
          }
        })
        .catch((e) => {
          alert("Something went wrong");
        });
  };

  return (     
    <>
    <Form onSubmit={handleSubmit} className="mt-4">
      <Row>
        <h3>
          Login:
        </h3>        
      </Row>
      <Row>        
        <Col  className="md-6 border border-5 justify-content-center">
        <Form.Group controlId="formUsername">
          <Form.Label className="w-100">
            Username: 
            <input
              type="text"   
              className="w-100"           
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
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
          <div>
            <Button variant="primary" type="submit" className="submitButton w-100">Submit</Button>
          </div>          
        </Col>                  
      </Row>
    </Form>    
     <MyVerticallyCenteredModal
     size="sm"
     show={modalShow}
     onHide={() => setModalShow(false)}
   />
   </>
  );
};
