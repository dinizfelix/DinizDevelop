import { useState, useEffect, useRef } from "react";
import "./editFuncionario.css";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import axios from "axios";
import { Toast, ToastMessage } from "primereact/toast";
import { Dropdown } from "primereact/dropdown";
import { FuncionarioDTO } from "../../../models/FuncionarioDTO";
import { InputNumber } from "primereact/inputnumber";
import { CargoDTO } from "../../../models/CargoDTO";

export default function EditarFuncionario({
  closeDialog,
  funcionarioId,
  onSuccess,
  onError,
}: {
  closeDialog: any;
  funcionarioId: FuncionarioDTO;
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
  const [cargo, setCargo] = useState<CargoDTO[]>([]);
  const [funcionario, setFuncionario] = useState({
    nome: "",
    rg: "",
    data_admissao: "",
    salario: 0,
    idCargo: "",
    email: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/cargo")
      .then((result) => {
        if (result.data.Status) {
          setCargo(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(
        `http://localhost:3000/auth/funcionario/${funcionarioId?.idFuncionario}`
      )
      .then((result) => {
        console.log(funcionarioId?.idFuncionario)
        setFuncionario({
          ...funcionario,
          nome: result.data.Result[0].Nome,
          rg: result.data.Result[0].Rg,
          salario: result.data.Result[0].Salario,
          idCargo: result.data.Result[0].idCargo,
          email: result.data.Result[0].email
        });
      })
      .catch((err) => console.log(err));
  }, []);

  // const ChangeWallet = async () => {
  //     try {
  //         const result = await axios.put(`${process.env.REACT_APP_API_URL}/v1/wallets/${wallet?.id}`, {
  //             currency: selectedCurrency,
  //             name: text1,
  //             createdAt: new Date()
  //         },
  //             {
  //                 headers: {
  //                     Authorization: `Bearer ${sessionStorage.getItem('access_token')}`
  //                 }
  //             })

  //         onSuccess('success', 'Success', 'Editado com sucesso.');

  //         closeDialog();

  //     }
  //     catch (err) {
  //         if (err = 400) {
  //             onError('error', 'Erro', 'Invalid currency');
  //         }
  //     }
  // }

  return (
    <div className="">
      {/* <h1>Incluir Funcionário</h1> */}

      <div className="flex-1 p-10">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2">Email</label>
              <InputText
                value={funcionario.email}
                onChange={(e) =>
                  setFuncionario({ ...funcionario, email: e.target.value })
                }
                type="email"
                placeholder="Email"
              />
              <label className="block mb-2">Salário</label>
              <InputNumber
                value={funcionario.salario}
                type="text"
                mode="currency"
                currency="BRL"
                minFractionDigits={2}
                maxFractionDigits={2}
                locale="pt-BR"
                placeholder="Salário"
                onChange={(e) =>
                  setFuncionario({ ...funcionario, salario: e.value! })
                }
              />
            </div>
            <div>
              <label className="block mb-2">Nome</label>
              <InputText
                value={funcionario.nome}
                type="text"
                placeholder="Nome"
                onChange={(e) =>
                  setFuncionario({ ...funcionario, nome: e.target.value })
                }
              />
              <label className="block mb-2">RG</label>
              <InputText
                value={funcionario.rg}
                type="number"
                placeholder="RG"
                onChange={(e) =>
                  setFuncionario({ ...funcionario, rg: e.target.value! })
                }
              />
              <label className="block mb-2">Data de Nascimento</label>
              <InputText
                value={funcionario.data_admissao}
                type="date"
                onChange={(e) =>
                  setFuncionario({
                    ...funcionario,
                    data_admissao: e.target.value!,
                  })
                }
              />
              <label className="block mb-2">Cargo</label>
              <select
                value={funcionario.idCargo}
                onChange={(e) =>
                  setFuncionario({ ...funcionario, idCargo: e.target.value })
                }
              >
                <option value="">Selecione um cargo</option>{" "}
                {cargo
                  .filter((cargoItem) => cargoItem.descricao !== null)
                  .map((cargoItem) => (
                    <option key={cargoItem.idCargo} value={cargoItem.idCargo}>
                      {cargoItem.descricao}
                    </option>
                  ))}
              </select>
              <select>
                <label className="block mb-2">Restaurante</label>
                <option>Casa Itália</option>
              </select>
            </div>
          </div>
          <div className="inclusao-button">
            <Button
              severity="success"
              label="Atualizar"
              //   onClick={(e) => {
              //     updaetFuncionario(e);
              //     console.log(funcionario.idCargo);
              //   }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
