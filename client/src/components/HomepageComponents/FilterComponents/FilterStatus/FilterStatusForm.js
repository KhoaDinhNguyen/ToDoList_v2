import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import InputCheckBox from "../../../utils/InputCheckBox/InputCheckBox";
//import "../../styles/components/FilterForm.css";
import styles from "./FilterStatusForm.module.css";

function FilterStatusForm(props) {
  const dispatch = useDispatch();
  const [allStatus, setAllStatus] = useState(true);
  const [pending, setPending] = useState(true);
  const [fulfilled, setFulfilled] = useState(true);
  const [failing, setFailing] = useState(true);
  const { setStatusFilter } = props;

  const onChangeAllStatus = () => {
    setPending(!allStatus);
    setFulfilled(!allStatus);
    setFailing(!allStatus);
    setAllStatus(!allStatus);
  };

  const onChangePending = () => {
    setPending(!pending);
  };

  const onChangeFulfilled = () => {
    setFulfilled(!fulfilled);
  };

  const onChangeFailing = () => {
    setFailing(!failing);
  };

  useEffect(() => {
    const statusFilter = [];
    if (pending) statusFilter.push("pending");
    if (fulfilled) statusFilter.push("fulfilled");
    if (failing) statusFilter.push("failing");
    setStatusFilter(statusFilter);
  }, [pending, fulfilled, failing, dispatch, setStatusFilter]);

  return (
    <div className={styles.rootContainer}>
      <h4 className={styles.title}>Status</h4>
      <div className={styles.statusContainers}>
        <InputCheckBox
          id="pendingFilter"
          labelText="Pending"
          checked={pending}
          onChangeHandler={onChangePending}
          containerStyle={styles.statusContainer}
          inputStyle={styles.statusInput}
          labelStyle={styles.statusLabel}
        />
        <InputCheckBox
          id="fulfilledFilter"
          labelText="Fulfilled"
          checked={fulfilled}
          onChangeHandler={onChangeFulfilled}
          containerStyle={styles.statusContainer}
          inputStyle={styles.statusInput}
          labelStyle={styles.statusLabel}
        />
        <InputCheckBox
          id="failingFilter"
          labelText="Failing"
          checked={failing}
          onChangeHandler={onChangeFailing}
          containerStyle={styles.statusContainer}
          inputStyle={styles.statusInput}
          labelStyle={styles.statusLabel}
        />
        <InputCheckBox
          id="allStatus"
          checked={allStatus}
          labelText="All apply"
          onChangeHandler={onChangeAllStatus}
          containerStyle={styles.statusContainer}
          inputStyle={styles.statusInput}
          labelStyle={styles.statusLabel}
        />
      </div>
    </div>
  );
}

export { FilterStatusForm };
