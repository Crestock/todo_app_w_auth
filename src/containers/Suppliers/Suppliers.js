import React, { useState } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import styled from "styled-components";
import { firestoreConnect } from "react-redux-firebase";

import Heading from "../../components/UI/Headings/Heading";
import { Container } from "../../hoc/layout/elements";
import InputTodo from "../Todos/InputTodo/InputTodo";
import Button from "../../components/UI/Forms/Button/Button";
import Loader from "../../components/UI/Loader/Loader";
import SupplierForm from './SupplierForm/SupplierForm'
const Wrapper = styled.div`
  width: 100%;
  align-self: flex-start;
  height: 100%;
  min-height: calc(100vh - 6rem);
  background-color: var(--color-mainLight);
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5rem 4rem;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 60rem;
  flex-direction: column;
  margin-top: 2rem;
`;

const Todos = ({ todos, requested, userId }) => {
  const [isAdding, setIsAdding] = useState(false);
  let content;
  if (!todos) {
    content = (
      <Content>
        <Loader isWhite />
      </Content>
    );
  } else if (!todos[userId] || !todos[userId].todos) {
    content = (
      <Content>
        <Heading color="white" size="h2">
          You have no todos!
        </Heading>
      </Content>
    );
  } else if (todos[userId].todos.length === 0) {
    content = (
      <Content>
        <Heading color="white" size="h2">
          You have no todos!
        </Heading>
      </Content>
    );
  } else {
    content = (
      <Content>
        {todos[userId].todos
          .slice(0)
          .reverse()
          .map(todo => (
            <SupplierForm key={todo.id} todo={todo} />
          ))}
      </Content>
    );
  }

  return (
    <Wrapper>
      <Container>
        <InnerWrapper>
          <Heading size="h4" color="white">
          <h2>Welcome to the supplier portal!</h2>
          <li>My Product Catalogue</li>
          <li>Add product </li>
          <li>Orders manager</li>
        </Heading>
          <Button color="main" contain onClick={() => setIsAdding(true)}>
            Add new product
          </Button>
          <InputTodo opened={isAdding} close={() => setIsAdding(false)} />
                  {content}
                  
        </InnerWrapper>
        
      </Container>
    </Wrapper>
  );
};

const mapStateToProps = ({ firebase, firestore }) => ({
  userId: firebase.auth.uid,
  todos: firestore.data.todos,
  requesting: firestore.status.requesting,
  requested: firestore.status.requested
});

const mapDispatchToProps = {};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(props => [`todos/${props.userId}`])
)(Todos);
