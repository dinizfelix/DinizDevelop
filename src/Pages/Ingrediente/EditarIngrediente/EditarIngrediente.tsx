import { useState, useEffect, useRef } from "react";
import "./editarIngrediente.css";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import axios from "axios";
import { Toast, ToastMessage } from "primereact/toast";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { IngredientesDTO } from "../../../models/IngredientesDTO";

export default function EditarIngrediente({
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
  const Edittoast = useRef<Toast>(null);
  const show = (
    severity: ToastMessage["severity"],
    summary: string,
    detail: string
  ) => {
    Edittoast.current?.show({ severity, summary, detail });
  };
 
  const [ingrediente, setIngrediente] = useState({
    nome: "",
  });
  const sharedClasses = {
    InputText: "w-full p-2 border rounded mb-4",
    select: "w-full p-2 border rounded mb-4",
    button:
      "w-full bg-green-600 text-white p-3 rounded-lg mt-4 hover:bg-green-700",
  };


  useEffect(() => {
    axios
      .get(
        `http://localhost:3000/chef/edit_ingrediente/${ingredienteId?.idIngrediente}`
      )
      .then((result) => {
        setIngrediente({
          nome: result.data.Result[0].nome,

        });
      })
      .catch((err) => console.log(err));
  }, []);

  const updateIngrediente = (e: any) => {
    e.preventDefault();
    axios
      .put(
        `http://localhost:3000/chef/edit_ingrediente/${ingredienteId?.idIngrediente}`,
        {
          nome: ingrediente.nome,
        }
      )
      .then((result) => {
        if (result.data.Status) {
          closeDialog();
          window.location.reload();
        } else {
          alert(result.data.Status);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="">
      <div className="flex-1 p-10">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2"></label>
              <InputText
                value={ingrediente.nome}
                className={sharedClasses.InputText}
                onChange={(e) =>
                  setIngrediente({ ...ingrediente, nome: e.target.value })
                }
                type="text"
                placeholder="Ingrediente"
              />
            </div>
          </div>
          <div className="inclusao-button">
            <Button
              severity="success"
              label="Atualizar"
              onClick={(e) => {
                updateIngrediente(e);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
