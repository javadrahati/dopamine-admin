import React, {useEffect, useState} from "react";
import {
	CAvatar,
	CBadge,
	CButton,
	CButtonGroup,
	CCard,
	CCardBody,
	CCardFooter,
	CCardHeader,
	CCardImage,
	CCardText,
	CCardTitle,
	CCloseButton,
	CCol,
	CContainer,
	CForm, CFormFloating,
	CFormInput, CFormLabel, CFormText, CFormTextarea, CImage, CListGroup, CListGroupItem,
	CModal,
	CModalBody,
	CModalFooter,
	CModalHeader,
	CRow, CSpinner,
	CTooltip
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {cilPen, cilPencil, cilTrash, cilX} from "@coreui/icons";
import CLoadingButton from "../../helpers/Components/CLoadingButton";
import ImageUpload from "../../helpers/Components/ImageUpload";
import Axios from "../../helpers/axios/Axios";



const Modal = ({ initialValue = "", onClose=null, onValueSubmitted = null, ...restProps }) => {

	const [value, setValue] = useState(initialValue)

	useEffect(() => {
		setValue(initialValue)
		return ()=>{}
	}, [initialValue]);
	const handleSubmit = () => {
		onValueSubmitted(value)
	}


	return (
		<CModal alignment={"top"}  {...restProps} onClose={onClose} size="lg">
			<CModalHeader closeButton>یادداشت برنامه تغذیه</CModalHeader>
			<CModalBody>
				<CRow>
					<CFormLabel htmlFor="input_val">متن یادداشت را وارد کنید:</CFormLabel>
					<CFormTextarea id="input_val"
								   type="text"
								   value={value}
									rows={4}
								   onChange={e => setValue(e.target.value)}
					/>
				</CRow>
			</CModalBody>
			<CModalFooter>
				<CButton color="primary" onClick={handleSubmit}>تایید</CButton>
			</CModalFooter>
		</CModal>
	)
}

export default Modal
