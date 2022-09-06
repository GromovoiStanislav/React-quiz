import React, { Component } from 'react';
import styles from './style.module.css';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import { createControl } from '../../form/formFramework';
import Auxiliary from '../../hoc/Auxiliary';

function createOptionControl(number) {
  return createControl(
    {
      label: `Вариант ${number}`,
      errorMessage: 'Значение не может быть пустым',
      id: number,
    },
    { required: true }
  );
}

function createFormControls() {
  return {
    question: createControl(
      {
        label: 'Введите вопрос',
        errorMessage: 'Вопрос не может быть пустым',
      },
      { required: true }
    ),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4),
  };
}

class QuizCreator extends Component {
  state = {
    quiz: [],
    formControls: createFormControls(),
  };

  sibmitHandler = (event) => {
    event.preventDefault();
  };

  addQuestionHandler = () => {};

  createQuizHandler = () => {};

  changeHandler = (value, controlName) => {};

  renderControls() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];

      return (
        <Auxiliary key={controlName + index}>
          <Input
            label={control.label}
            value={control.value}
            valid={control.valid}
            shouldValidate={!!control.validation}
            touched={control.touched}
            errorMessage={control.errorMessage}
            onChange={(event) =>
              this.changeHandler(event.target.value, controlName)
            }
          />
          {index === 0 ? <hr /> : null}
        </Auxiliary>
      );
    });
  }

  render() {
    return (
      <div className={styles.QuizCreator}>
        <div>
          <h1>Создание теста</h1>
          <form onSubmit={this.submitHandler}>
            {this.renderControls()}
            <select></select>
            <Button type="primary" onClick={this.addQuestionHandler}>
              Добавить вопрос
            </Button>

            <Button type="success" onClick={this.createQuizHandler}>
              Создать тест
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default QuizCreator;
