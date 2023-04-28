import { useState } from "react";
import { DeedList } from "../../Components/DeedList/DeedList";
import withAuth from "../../Components/WithAuth/withAuth";

import styles from "./Index.module.sass";
import Modal from "../../ui/src/Modal/Modal";
import { DeedModal } from "../../Components/DeedModal/DeedModal";
import { useCreateDeedMutation } from "../../store/api/DeedsController";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { addDeeds } from "../../store/reducers/userReducer";

const Deeds = () => {
  const [toggler, setToggler] = useState(0);
  const [typeList, setTypeList] = useState("own");
  const [isAdd, setIsAdd] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { nickname } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();

  const [createDeed] = useCreateDeedMutation();

  const handleChange = (percents: number, type: string): void => {
    setToggler(percents);
    setTypeList(type);
  };

  const handleSubmit = async () => {
    try {
      const result = await createDeed(
        JSON.stringify({
          title,
          description,
          nickname,
        }),
      ).unwrap();
      dispatch(addDeeds(result.deeds));
      setTitle("");
      setDescription("");
      setIsAdd((prev) => !prev);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <section className={styles["deeds"]}>
      <button
        className={styles["add__deed"]}
        onClick={() => setIsAdd((prev) => !prev)}
      >
        Добавить
      </button>
      <h1 className={styles["deeds__title"]}>Список добрых дел</h1>
      <div className={styles["deeds__switcher"]}>
        <div onClick={() => handleChange(0, "own")}>Мой список</div>
        <div onClick={() => handleChange(50, "friends")}>Список друзей</div>
        <div
          className={styles["background-toggler"]}
          style={{ left: `${toggler}%` }}
        ></div>
      </div>
      <DeedList type={typeList} flag={isAdd} />
      {isAdd && (
        <Modal
          onClose={() => setIsAdd((prev) => !prev)}
          onSubmit={handleSubmit}
          submitText={"Добавить"}
        >
          <DeedModal
            title={title}
            setTitle={(e) => setTitle(e.target.value)}
            description={description}
            setDescription={(e) => setDescription(e.target.value)}
          />
        </Modal>
      )}
    </section>
  );
};

export default withAuth(Deeds);

export async function getServerSideProps(context) {
  const token = context.req.cookies.token;
  console.log("TOKEN DEEDS", token);
  return { props: {} };
}
