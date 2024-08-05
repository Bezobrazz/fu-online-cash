import { useEffect, useState } from "react";

import { Button, CardList, EditEmployeeForm, Modal } from "../components";

import { getUsers } from "../firebase";
import { useModal } from "../hooks";

const Users = () => {
  const [users, setUsers] = useState([]);

  const [isOpenModal, toggleModal] = useModal();

  useEffect(() => {
    getUsers().then((res) => {
      setUsers(res);
    });
  }, []);

  return (
    <section className="p-5 space-y-4">
      <CardList title="Список працівників" items={users} />
      <Button
        type="button"
        className="primary-btn block mx-auto"
        onClick={toggleModal}
      >
        Додати працівника
      </Button>
      {isOpenModal && (
        <Modal title="Додавання працівника" toggleModal={toggleModal}>
          <EditEmployeeForm toggleModal={toggleModal} />
        </Modal>
      )}
    </section>
  );
};

export default Users;
