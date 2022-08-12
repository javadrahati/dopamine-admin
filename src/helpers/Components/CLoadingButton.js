import React from "react";
import {CButton, CSpinner} from "@coreui/react";

const CLoadingButton = ({children, loading = false, disabled = false, loadingSize = "sm", onClick=() => {}, ...restProps}) => {

	return (
		<CButton onClick={onClick} disabled={disabled} {...restProps} >
			{ loading && (
				<CSpinner component="span" className="mx-2" size={loadingSize || "sm"} aria-hidden="true"/>
			)}
			{children}
		</CButton>
	)
}

export default CLoadingButton
