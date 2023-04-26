import React from "react";
import { RootState } from "store/store";
import { useSelector } from "react-redux";
import { Navigate, useOutlet } from "react-router-dom";
import styles from "./Root.module.css";

export function Root() {
	const outlet = useOutlet();
	const user = useSelector((state: RootState) => state.currentUser);

	if (!user) return <Navigate to="/auth" />;

	return (
		<div className={styles["root-container"]}>
			<div className={styles["nav-bar"]} />
			{outlet}
		</div>
	);
}
