import SquareIcon from "@mui/icons-material/Square";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
//import "./subjectList.css";

function SubjectList() {
  return (
    <section style={{ marginTop: "2rem" }} className="pricing-table">
      <Container fluid>
        <Row className="justify-content-md-center">
          <Col md={3} lg={3} className="pricing-table">
            <div className="item card">
              <div className="down-content">
                <h4>Physical Science</h4>
                <hr />
                <ul style={{ listStyle: "inside" }}>
                  <li className="py-2">
                    {/*<h6> */}
                    <Link to="/course" className="py-3 text-dark">
                      Physics
                    </Link>
                    {/*</h6>  */}
                  </li>
                  <li className="py-2">
                    {/*<h6> */}
                    <a href="#" className="py-3 text-dark">
                      Chemistry
                    </a>
                    {/*</h6>  */}
                  </li>
                  <li className="py-2">
                    {/*<h6> */}
                    <a href="#" className="py-3 text-dark">
                      Biology
                    </a>
                    {/*</h6>  */}
                  </li>
                </ul>
                {/*<h6>
                  Price : <strong>100.12 ETB</strong>
                </h6>
                <h6>
                  Stock : <strong> 43 piece</strong>
                </h6>
                <p>Description about the apparatus</p>*/}
              </div>
            </div>
            {/*<div className="item">
              <div className="heading">
                <h3>Physical Science</h3>
              </div>
              <List>
                <ListItem>
                  <Link style={{ width: "100%" }} to="/course">
                    <ListItemButton>
                      <ListItemIcon>
                        <SquareIcon />
                      </ListItemIcon>
                      <ListItemText primary="Physics" />
                    </ListItemButton>
                  </Link>
                </ListItem>
                <ListItem>
                  <ListItemButton>
                    <ListItemIcon>
                      <SquareIcon />
                    </ListItemIcon>
                    <ListItemText primary="Chemistry" />
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>
                    <ListItemIcon>
                      <SquareIcon />
                    </ListItemIcon>
                    <ListItemText primary="Biology" />
                  </ListItemButton>
                </ListItem>
              </List>
            </div>*/}
          </Col>
          <Col md={3} lg={3} className="pricing-table">
            <div className="item">
              <div className="heading">
                <h3>Social Science</h3>
              </div>
              <List>
                <ListItem>
                  <ListItemButton>
                    <ListItemIcon>
                      <SquareIcon />
                    </ListItemIcon>
                    <ListItemText primary="Geography" />
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>
                    <ListItemIcon>
                      <SquareIcon />
                    </ListItemIcon>
                    <ListItemText primary="Politics" />
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>
                    <ListItemIcon>
                      <SquareIcon />
                    </ListItemIcon>
                    <ListItemText primary="Civics" />
                  </ListItemButton>
                </ListItem>
              </List>
            </div>
          </Col>
          <Col md={3} lg={3} className="pricing-table">
            <div className="item">
              <div className="heading">
                <h3>History and Art</h3>
              </div>
              <List>
                <ListItem>
                  <ListItemButton>
                    <ListItemIcon>
                      <SquareIcon />
                    </ListItemIcon>
                    <ListItemText primary="Histry" />
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>
                    <ListItemIcon>
                      <SquareIcon />
                    </ListItemIcon>
                    <ListItemText primary="Art" />
                  </ListItemButton>
                </ListItem>
              </List>
            </div>
          </Col>
          <Col md={3} lg={3} className="pricing-table">
            <div className="item">
              <div className="heading">
                <h3>Science and Technology</h3>
              </div>
              <List>
                <ListItem>
                  <ListItemButton>
                    <ListItemIcon>
                      <SquareIcon />
                    </ListItemIcon>
                    <ListItemText primary="Computer" />
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>
                    <ListItemIcon>
                      <SquareIcon />
                    </ListItemIcon>
                    <ListItemText primary="Engineering" />
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>
                    <ListItemIcon>
                      <SquareIcon />
                    </ListItemIcon>
                    <ListItemText primary="Science Application" />
                  </ListItemButton>
                </ListItem>
              </List>
            </div>
          </Col>
          <Col md={3} lg={3} className="pricing-table">
            <div className="item">
              <div className="heading">
                <h3>Miscliniuous</h3>
              </div>
              <List>
                <ListItem>
                  <ListItemButton>
                    <ListItemIcon>
                      <SquareIcon />
                    </ListItemIcon>
                    <ListItemText primary="Computer" />
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>
                    <ListItemIcon>
                      <SquareIcon />
                    </ListItemIcon>
                    <ListItemText primary="Engineering" />
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>
                    <ListItemIcon>
                      <SquareIcon />
                    </ListItemIcon>
                    <ListItemText primary="Science Application" />
                  </ListItemButton>
                </ListItem>
              </List>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default SubjectList;
