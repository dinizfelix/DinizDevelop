import { useEffect, useRef, useState } from "react";
import "./inclusao.css";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import axios from "axios";
import { Toast, ToastMessage } from "primereact/toast";
import { Dropdown } from "primereact/dropdown";
import { useNavigate } from "react-router-dom";
import { IngredientesDTO } from "../../../models/IngredientesDTO";

export default function IncluirIngrediente({
  closeDialog,
  ingredienteId,
  onSuccess,
  onError,
}: {
  closeDialog: any;
  ingredienteId: IngredientesDTO;
  onSuccess: Function;
  onError: Function;
}) {
  const [ingrediente, setIngrediente] = useState("");
  let navigate = useNavigate();
  const sharedClasses = {
    InputText: "w-full p-2 border rounded mb-4",
    select: "w-full p-2 border rounded mb-4",
    button:
      "w-full bg-green-600 text-white p-3 rounded-lg mt-4 hover:bg-green-700",
  };
  const show = (
    severity: ToastMessage["severity"],
    summary: string,
    detail: string
  ) => {
    toast.current?.show({ severity, summary, detail });
  };
  const toast = useRef<Toast>(null);

  async function addIngrediente(e: any) {
    e.preventDefault();

    try {
      const result = await axios
        .post("http://localhost:3000/chef/add_ingrediente", {
          nome: ingrediente,
        })
        .then((result) => {
          if (result.data.Status) {
            show("success", "Sucesso", "Ingrediente cadastrado com sucesso");
            closeDialog();
            window.location.reload();
          } else {
            alert(result.data.Status);
          }
        });
    } catch (err: any) {
      console.log(err);
    }
  }

  return (
    <div className="">
      <div className="flex-1 p-10">
        <div className="bg-white shadow-md rounded-lg p-6">
          <label className="block mb-2">Ingrediente</label>
          <InputText
            value={ingrediente}
            onChange={(e) => setIngrediente(e.target.value)}
            type="text"
            className={sharedClasses.InputText}
            placeholder="Digite um ingrediente"
          />

          <div className="inclusao-button">
            <Button
              severity="success"
              label="Registrar"
              onClick={(e) => addIngrediente(e)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
