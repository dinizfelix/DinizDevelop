import "./ingrediente.css";
import { Menu } from "primereact/menu";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";
import { SplitButton } from "primereact/splitbutton";
import { MenuItem } from "primereact/menuitem";
import { Dialog } from "primereact/dialog";
import { Toast, ToastMessage } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import IncluirIngrediente from "./IncluirIngrediente/IncluirIngrediente";
import EditarIngrediente from "./EditarIngrediente/EditarIngrediente";
import { IngredientesDTO } from "../../models/IngredientesDTO";

export default function Ingrediente() {
  const [find, setFind] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedIngrediente, setSelectedIngrediente] = useState<any>();
  const [showNovoIngrediente, setShowNovoIngrediente] = useState(false);
  const [showEditIngrediente, setShowEditIngrediente] = useState(false);
  const [showDeleteIngrediente, setShowDeleteIngrediente] = useState(false);
  const [ingrediente, setIngrediente] = useState<IngredientesDTODTO[]>([]);
  const toast = useRef<Toast>(null);
  const navigate = useNavigate();

  const showToast = (
    severity: ToastMessage["severity"],
    summary: string,
    detail: string
  ) => {
    toast.current?.show([{ severity, summary, detail }]);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/chef/ingrediente")
      .then((result) => {
        if (result.data.Status) {
          setIngrediente(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const deleteIngrediente = async (id: number) => {
    axios
      .delete(`http://localhost:3000/chef/delete_ingrediente/` + id)
      .then((result) => {
        if (result.data.Status) {
          window.location.reload();
        } else {
          alert(result.data.Status);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="wallet-container">
      <Toast ref={toast} />
      <div className="wallet-main-content">
        <h1>Ingrediente</h1>

        <div className="wallet-menu">
          <div className="wallet-text">
            <span className="p-float-label">
              <InputText
                id="text1"
                value={find}
                onChange={(e) => setFind(e.target.value)}
              />
              <label htmlFor="text1">Nome</label>
            </span>
          </div>

          <div className="wallet-buttons-container">
            <div className="wallet-first-button">
              <Button
                label="FILTRAR"
                // onClick={() => {
                //   fetchWallets({ name: find });
                // }}
              />
            </div>

            <div className="wallet-last-button">
              <Button
                id="inclusaoCargo"
                label="Categoria"
                icon="pi pi-plus"
                onClick={() => setShowNovoIngrediente(true)}
              />
            </div>
          </div>
        </div>

        <DataTable
          loading={loading}
          selectionMode="single"
          selection={selectedIngrediente}
          onSelectionChange={(e) => {
            setSelectedIngrediente(e.value);
          }}
          tableStyle={{ minWidth: "50rem" }}
          value={ingrediente}
        >
          <Column
            body={(data) => {
              return (
                <span>
                  {data.Ingrediente}
                </span>
              );
            }}
            header="Id"
          ></Column>
          <Column
            field="role"
            header="Ingrediente"
            body={(data) => (
              <div>
                <span>{data.nome}</span>
              </div>
            )}
          ></Column>
          <Column
            field="action"
            header="Ações"
            body={(data) => (
              <div>
                <Button
                  icon="pi pi-pencil"
                  className="p-button-rounded p-button-text"
                  onClick={() => {
                    setShowEditIngrediente(true);
                  }}
                />
                <Button
                  icon="pi pi-trash"
                  className="p-button-rounded p-button-text"
                  onClick={() => {
                    confirmDialog({
                      message: "Deseja deletar?",
                      header: "Deletar Ingrediente",
                      accept: () => deleteIngrediente(data.idIngrediente),
                      reject: () => setShowDeleteIngrediente(false),
                    });
                  }}
                />
              </div>
            )}
          ></Column>
        </DataTable>
      </div>

      <Dialog
        header="Editar Ingrediente"
        visible={showEditIngrediente}
        style={{ width: "50vw" }}
        onHide={() => setShowEditIngrediente(false)}
      >
        <EditarIngrediente
          ingredienteId={selectedIngrediente}
          closeDialog={() => {
            setShowEditIngrediente(false);
          }}
          onSuccess={showToast}
          onError={showToast}
        ></EditarIngrediente>
      </Dialog>
      <Dialog
        header="Incluir Ingrediente"
        visible={showNovoIngrediente}
        style={{ width: "50vw" }}
        onHide={() => {
          setShowNovoIngrediente(false);
        }}
      >
        <IncluirIngrediente
          closeDialog={() => {
            setShowNovoIngrediente(false);
          }}
          onSuccess={showToast}
          onError={showToast}
        ></IncluirIngrediente>
      </Dialog>
      <ConfirmDialog />
    </div>
  );
}
