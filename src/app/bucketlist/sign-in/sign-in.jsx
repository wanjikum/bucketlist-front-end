import React from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  FormText
} from "reactstrap";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import styled from "styled-components";
// import {
//   Button,
//   Form as ReactstrapForm,
//   FormGroup,
//   Label,
//   Input,
//   Col,
//   Collapse,
//   Navbar,
//   NavbarToggler,
//   NavbarBrand,
//   Nav,
//   NavItem,
//   NavLink
// } from "reactstrap";
// import img from "../../public/images/beauti-1.jpg";

// const Container = styled.div`
//   height: 100vh;
//   width: 100%;
//   display: flex;
//   flex-direction: column;
// `;

// const Header = styled.h1`
//   color: black;
// `;

// const SubHeader = styled.h5`
//   color: black;
// `;

// const FieldWrapper = styled.div`
//   margin-bottom: 0.5rem;
// `;

// const InputLabel = styled(Label)`
//   color: black;
// `;

// const ErrorMessageWrapper = styled.div`
//   margin-bottom: 1rem;
//   color: red;
// `;

// const Container1 = styled.div`
//   flex: 1;
//   background-image: url(${img});
//   background-size: cover;
// `;

// const Container2 = styled.div`
//   flex: 1;
//   background: white;
//   padding: 2.5rem;
// `;

// const ButtonWrapper = styled(Button)`
//   margin-left: 1rem;
//   color: white;
//   background: white;
// `;

// const Container4 = styled.div`
//   display: flex;
//   height: 100%;
// `;

// class CustomNav extends React.Component {
//   constructor(props) {
//     super(props);

//     this.toggle = this.toggle.bind(this);
//     this.state = {
//       isOpen: false
//     };
//   }
//   toggle() {
//     this.setState({
//       isOpen: !this.state.isOpen
//     });
//   }
//   render() {
//     return (
//       <div>
//         <Navbar color="light" light expand="md">
//           <NavbarBrand href="/">Bucketlist</NavbarBrand>
//           <NavbarToggler onClick={this.toggle} />
//           <Collapse isOpen={this.state.isOpen} navbar>
//             <Nav className="ml-auto" navbar>
//               <NavItem>
//                 <NavLink href="#">Sign In</NavLink>
//               </NavItem>
//               <NavItem>
//                 <NavLink href="/sign-up/">Sign Up</NavLink>
//               </NavItem>
//             </Nav>
//           </Collapse>
//         </Navbar>
//       </div>
//     );
//   }
// }

// const initialValues = {
//   email: "",
//   password: ""
// };

// const handleSubmit = values => {
//   setTimeout(() => {
//     alert(JSON.stringify(values, null, 2));
//   }, 1000);
// };

// const validateEmail = value => {
//   let error;
//   if (!value) {
//     error = "Required";
//   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
//     error = "Invalid email address";
//   } else if (value.length < 5) {
//     error = "Email too short";
//   } else if (value.length >= 30) {
//     error = "Email too long";
//   }
//   return error;
// };

// const validatePassword = value => {
//   let error;
//   if (!value) {
//     error = "Required";
//   } else if (value.length < 6) {
//     error = "Password too short";
//   } else if (value.length >= 15) {
//     error = "Password too long";
//   }
//   return error;
// };

// const SignIn = () => {
//   return (
//     <Container>
//       <CustomNav />
//       <Container4>
//         <Container1>This is the image</Container1>
//         <Container2>
//           <Header>Sign In</Header>
//           <SubHeader>Already a member? Sign in here</SubHeader>
//           <Formik initialValues={initialValues} onSubmit={handleSubmit}>
//             {({ values, errors }) => {
//               console.log("matches>>>>", values);
//               return (
//                 <ReactstrapForm>
//                   <Form>
//                     <FormGroup>
//                       <FieldWrapper>
//                         <InputLabel sm={2} valid>Email:</InputLabel>
//                         <Col md={6}>
//                           <Field
//                             name="email"
//                             validate={validateEmail}
//                             component={Input}
//                           />
//                         </Col>
//                       </FieldWrapper>
//                       <ErrorMessageWrapper>
//                         <ErrorMessage name="email" />
//                       </ErrorMessageWrapper>
//                     </FormGroup>
//                     <FormGroup>
//                       <FieldWrapper>
//                         <InputLabel sm={2}>Password:</InputLabel>
//                         <Col md={6}>
//                           <Field
//                             name="password"
//                             type="password"
//                             validate={validatePassword}
//                             component={Input}
//                           />
//                         </Col>
//                       </FieldWrapper>
//                       <ErrorMessageWrapper>
//                         <ErrorMessage name="password" />
//                       </ErrorMessageWrapper>
//                     </FormGroup>
//                     <ButtonWrapper>
//                       <Button type="submit" size="lg" outline color="secondary">
//                         Create Account
//                       </Button>
//                     </ButtonWrapper>
//                   </Form>
//                 </ReactstrapForm>
//               );
//             }}
//           </Formik>
//         </Container2>
//       </Container4>
//     </Container>
//   );
// };

class Example extends React.Component {
  render() {
    return (
      <Form>
        <FormGroup>
          <Label for="exampleEmail">Input without validation</Label>
          <Input />
          <FormFeedback>You will not be able to see this</FormFeedback>
          <FormText>Example help text that remains unchanged.</FormText>
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Valid input</Label>
          <Input valid />
          <FormFeedback valid>Sweet! that name is available</FormFeedback>
          <FormText>Example help text that remains unchanged.</FormText>
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Invalid input</Label>
          <Input invalid />
          <FormFeedback>Oh noes! that name is already taken</FormFeedback>
          <FormText>Example help text that remains unchanged.</FormText>
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Input without validation</Label>
          <Input />
          <FormFeedback tooltip>You will not be able to see this</FormFeedback>
          <FormText>Example help text that remains unchanged.</FormText>
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Valid input</Label>
          <Input valid />
          <FormFeedback valid tooltip>
            Sweet! that name is available
          </FormFeedback>
          <FormText>Example help text that remains unchanged.</FormText>
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Invalid input</Label>
          <Input invalid />
          <FormFeedback tooltip>
            Oh noes! that name is already taken
          </FormFeedback>
          <FormText>Example help text that remains unchanged.</FormText>
        </FormGroup>
      </Form>
    );
  }
}

export default Example;

// export default SignIn;
