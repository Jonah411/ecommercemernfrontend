import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {
  useChangeRollMutation,
  useGetAllRollsQuery,
} from "../../feature/profileReducer/authProfile";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import AlertToast from "../common/AlertToast";

const ChangeRoll = ({ rollName, userId }) => {
  const { data: rollsData } = useGetAllRollsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  const [changeRoll, { data, error, isSuccess, isError }] =
    useChangeRollMutation();
  const [rolls, setRolls] = useState(rollsData?.data);
  useEffect(() => {
    setRolls(rollsData?.data);
  }, [rollsData]);
  const init = {
    roll: rollName,
  };
  const [changeRollData, setChangeRollData] = useState(init);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const rollCreate = (e) => {
    const { name, value } = e.target;
    setChangeRollData({ ...changeRollData, [name]: value });
  };
  const menuSave = () => {
    console.log(changeRollData.roll);
    let rollData = {
      userId: userId,
      newRollId: changeRollData.roll,
    };
    changeRoll(rollData);
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success(`${data?.message}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }
    if (isError) {
      toast.error(`Error${data?.message}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [isSuccess, isError]);
  return (
    <>
      <Button variant="link" onClick={handleShow}>
        ChangeRoll
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>User ChangeRoll</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <div className="d-flex justify-content-between">
            <Form.Select
              aria-label="Default select example"
              name="roll"
              onChange={rollCreate}
              value={changeRollData.roll}
            >
              {rolls?.map((roll) => (
                <option key={roll._id} value={roll.name}>
                  {roll.name}
                </option>
              ))}
            </Form.Select>

            <button className="btn btn-primary" onClick={() => menuSave()}>
              Add Menu
            </button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
        <AlertToast />
      </Modal>
    </>
  );
};

export default ChangeRoll;
