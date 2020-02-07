import React from "react";
import { connect } from "react-redux";
import { Formik, Field, withFormik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import Button from "../../../components/UI/Forms/Button/Button";
import Heading from "../../../components/UI/Headings/Heading";
import Modal from "../../../components/UI/Modal/Modal";
import Input from "../../../components/UI/Forms/Input/Input";
import Message from "../../../components/UI/Message/Message";
import { StyledForm } from "../../../hoc/layout/elements";

import * as actions from "../../../store/actions";

const ButtonsWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 2rem;
  justify-content: space-around;
`;

const MessageWrapper = styled.div`
  position: absolute;
  bottom: 0rem;
  width: 100%;
  padding: 0 3rem;
`;

const TodoSchema = Yup.object().shape({
  todo: Yup.string()
    .required("The todo is required.")
    .min(4, "Too short.")
});

const InputTodo = ({
  editTodo,
  close,
  opened,
  addTodo,
  loading,
  error,
  editTodoAction
}) => {
  const loadingText = editTodo ? "Editing..." : "Adding...";

  return (
    <>
      <Modal opened={opened} close={close}>
        <Heading noMargin size="h1" color="white">
          {editTodo ? "Edit your quote" : "Add a new quote"}
        </Heading>
        <Heading bold size="h4" color="white">
          {editTodo
            ? "Edit your quote and tap edit"
            : "Type your quote and press add"}
        </Heading>
        <Formik
          initialValues={{
            todo: editTodo ? editTodo.todo : "",
            length: "",
            width: "",
            thickness: "",
            units: ""
          }}
          validationSchema={TodoSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            // send our todo
            const res = editTodo
              ? await editTodoAction(editTodo.id, values)
              : await addTodo(values);
            console.log(values);
            if (res) {
              close();
            }
            setSubmitting(false);
            resetForm();
          }}
        >
          {({ isSubmitting, isValid, resetForm }) => (
            <StyledForm>
              <div>
                <Field name="units" component="select" placeholder="m">
                  <option value="m">Metres - m</option>
                  <option value="mm">Millimetres - mm</option>
                </Field>
              </div>
              <Field
                type="text"
                name="todo"
                placeholder="Enter what you're looking for: i.e metal plate"
                component={Input}
              />
              <Field
                type="text"
                name="length"
                placeholder="length"
                component={Input}
              />
              <Field
                type="text"
                name="width"
                placeholder="width"
                component={Input}
              />
              <Field
                type="text"
                name="thickness"
                placeholder="thickness"
                component={Input}
              />
              <ButtonsWrapper>
                <Button
                  contain
                  color="main"
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  loading={loading ? loadingText : null}
                >
                  {editTodo ? "Edit Query" : "Add Query"}
                </Button>
                <Button
                  type="button"
                  color="main"
                  contain
                  onClick={() => {
                    close();
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
              </ButtonsWrapper>
              <MessageWrapper>
                <Message error show={error}>
                  {error}
                </Message>
              </MessageWrapper>
            </StyledForm>
          )}
        </Formik>
      </Modal>
    </>
  );
};

const mapStateToProps = ({ todos }) => ({
  loading: todos.loading,
  error: todos.error
});

const mapDispatchToProps = {
  addTodo: actions.addTodo,
  editTodoAction: actions.editTodo
};

export default connect(mapStateToProps, mapDispatchToProps)(InputTodo);
