import { FormApi } from "final-form";
import { makeValidateSync, TextField } from "mui-rff";
import { FC, useState } from "react";
import { Field, Form } from "react-final-form";
import { useSetRecoilState } from "recoil";
import * as yup from "yup";

import { tasksState } from "../../store/tasksStore";
import { MaskInput } from "../MaskInput";
import { Modal } from "../Modal";
import "./style.css";

interface FormValues {
  title: string;
  date: string;
}

const makeValidationSchema = (): yup.SchemaOf<FormValues> =>
  yup.object().shape({
    title: yup.string().required("Обязательное поле"),
    date: yup.string().length(10).required("Обязательное поле"),
  });

const validateForm = makeValidateSync(makeValidationSchema());

export const AddTaskModal: FC = () => {
  const setTasks = useSetRecoilState(tasksState);
  const [modalActive, setModalActive] = useState(false);

  const handleFormSubmit = (
    values: FormValues,
    form: FormApi<FormValues, Partial<FormValues>>
  ) => {
    setTasks((oldState) => [
      ...oldState,
      {
        id: Date.now(),
        title: values.title,
        isComplete: false,
        isArchived: false,
        createdAt: values.date,
      },
    ]);
    setModalActive(false);
    form.reset();
  };

  return (
    <>
      <button
        className="task-modal__button"
        onClick={() => setModalActive(true)}
      >
        Новая задача
      </button>
      <Modal modalActive={modalActive} setModalActive={setModalActive}>
        <Form
          onSubmit={handleFormSubmit}
          validate={validateForm}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <div className="task-modal__container">
                <h2>Добавить задачу</h2>
                <TextField name="title" placeholder="Название" />
                <Field
                  name="date"
                  render={({
                    input: { onChange, value },
                    meta: { error, invalid, pristine },
                  }) => (
                    <>
                      <MaskInput
                        value={value}
                        onChange={(value) => onChange(value)}
                      />
                      {invalid && pristine && (
                        <span className="task-modal__error">{error}</span>
                      )}
                    </>
                  )}
                />
                <button className="task-modal__button">Создать</button>
              </div>
            </form>
          )}
        />
      </Modal>
    </>
  );
};
