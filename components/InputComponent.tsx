import React from "react";
import { useForm } from "react-hook-form";

export interface InputComponentProps {}

export default function InputComponent({}: InputComponentProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div className="text-center py-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center justify-center">
          <label className="pb-2" htmlFor="columns">
            Columns
          </label>
          <input
            className="rounded-lg mb-2"
            defaultValue={0}
            type="number"
            {...register("columns", { required: true, min: 1 })}
          />
          {errors.columns && errors.columns.type === "min" && (
            <>
              <span className="text-red-600">Min number of columns is 1</span>
            </>
          )}
        </div>
        <div className="flex flex-col items-center justify-center">
          <label className="pb-2" htmlFor="rows">
            Rows
          </label>

          <input
            className="rounded-lg mb-2"
            defaultValue={0}
            type="number"
            {...register("rows", { required: true, min: 1 })}
          />
          {errors.rows && errors.rows.type === "min" && (
            <>
              <span className="text-red-600">Min number of rows is 1</span>
            </>
          )}
        </div>
        <br />

        <input className="p-2 rounded-lg" type="submit" />
      </form>
    </div>
  );
}
