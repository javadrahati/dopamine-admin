import {
	CAlert,
	CButton,
	CCol,
	CContainer,
	CRow,
	CSpinner,
	CToast,
	CToastBody, CToastClose,
	CToaster,
	CToastHeader
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {cilPlus, cilWarning} from "@coreui/icons";
import CPaginationView from "../../helpers/Components/CPaginationView";
import React, {useEffect, useRef, useState} from "react";

const CPageHeaderView = (
	{
		addButton= true,
		loading= false,
		onAddButtonClick= ( _ => {} ),
		pagination= false,
		activePage= 1,
		pages= 1,
		onActivePageChange= ( _ => {} ),
		alertMessage="",
		onCloseAlert=() => {},
	}
) => {

	const toaster = useRef()
	const [toast, addToast] = useState(0)

	useEffect( () => {
		if(alertMessage && alertMessage.length > 0) {
			addToast(errorToastView(alertMessage))
		}
		return () => {}
	}, [alertMessage])

	const errorToastView = (message, title = "Error") => ( message && message.length > 0) ? (
		<CToast title={title}>
			<CToastHeader closeButton>
				<CIcon icon={cilWarning} className="text-danger"/>
				<strong className="me-auto text-danger">{title}</strong>
			</CToastHeader>
			<CToastBody>{message ?? ""}</CToastBody>
		</CToast>
	) : null

	return (
		<CContainer>
			<CAlert dismissible
			        visible={alertMessage != null && alertMessage.length > 0}
			        color="danger"
			        onClose={onCloseAlert}>
				{alertMessage}
			</CAlert>
			<CRow xs={{cols: 'auto'}} className="justify-content-between align-items-center">
				<CCol>
					<CRow xs={{cols: 'auto'}} className="align-items-center">
						<CCol>
							{addButton &&
							<CButton color="dark" variant="outline" onClick={() => onAddButtonClick(null)}>
								<CIcon icon={cilPlus} className="mx-2"/>
								افزودن
							</CButton>
							}
						</CCol>
						<CCol>
							{ loading && <CSpinner className="mx-2" size="sm"/> }
						</CCol>
					</CRow>
				</CCol>
				<CCol>
					{ pagination && <CPaginationView
						size={"md"}
						align={"end"}
						activePage={activePage}
						pages={pages}
						onActivePageChange={onActivePageChange}
					/> }
				</CCol>
			</CRow>

			<CToaster ref={toaster} push={toast} placement="top-end" />
		</CContainer>
	)
}

export default CPageHeaderView
