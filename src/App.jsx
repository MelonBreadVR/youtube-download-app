
import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import { Formik } from 'formik';
import * as yup from 'yup';
import download from './youtubeDownload';
import logo from './image/logo.png';
import './App.css';


const { shell } = window.require('electron');

const schema = yup.object({
  url: yup.string().required(),
});

const openURL = () => shell.openExternal('https://www.twitch.tv/melonpangames');


const App = () => (
  <Container className="twitch">
    <Row className="justify-content-center">
      <Image className="logo" src={logo} />
    </Row>
    <Row>
      <Col>
        <Formik
          validationSchema={schema}
          onSubmit={download}
          initialValues={{
            url: '',
          }}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            isValid,
            errors,
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>
                    Throw in the YouTube URL and start downloading the goods with out annoying Ads! <br/>
                    Please support me by following ❤️
                    {' '}
                    <a href="#" onClick={openURL}>MelonPanGames</a>
                    {' '}
                    ❤️!
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="url"
                    value={values.url}
                    onChange={handleChange}
                    isValid={touched.url && !errors.url}
                    placeholder="YouTube URL"
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
              <Button type="submit">Download !</Button>
            </Form>
          )}
        </Formik>
      </Col>
    </Row>
  </Container>
);

export default App;
