import React, {useEffect, useState} from "react";
import {
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
	CFormInput, CFormLabel, CImage,
	CModal,
	CModalBody,
	CModalFooter,
	CModalHeader,
	CRow,
	CTooltip
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {cilPen, cilPencil, cilTrash, cilX} from "@coreui/icons";
import CLoadingButton from "../../helpers/Components/CLoadingButton";
import ImageUpload from "../../helpers/Components/ImageUpload";
import Axios from "../../helpers/axios/Axios";



const DeleteItemModal = ({ endpoint = "", item=undefined, onClose=null, onDeleteResponse =null, ...restProps }) => {

	const [loading, setLoading] = useState(false)

	const handleConfirm = () => {
		if(endpoint && endpoint.length > 0) {
			setLoading(true)
			Axios.delete(endpoint)
				.then(res => {
					setLoading(false)
					if(onDeleteResponse) {
						onDeleteResponse(res.data)
					} else if(onClose) {
						onClose()
					}
				})
				.catch(err => {
					setLoading(false)
					if(onClose) onClose()
				});
		} else {
			if(onDeleteResponse)
				onDeleteResponse(item)
		}

	}

	return (
		<CModal alignment={"center"}  {...restProps} onClose={onClose}>
			<CModalHeader closeButton={true}>حذف</CModalHeader>
			<CModalBody>
				از حذف این آیتم مطمئن هستید؟
			</CModalBody>
			<CModalFooter>
				{ onClose != null &&
				<CButton variant="ghost" color="dark" onClick={onClose}>بستن</CButton>
				}
				<CLoadingButton loading={loading} color="danger" variant="outline" onClick={handleConfirm}>حذف کن</CLoadingButton>
			</CModalFooter>
		</CModal>
	)
}

export default DeleteItemModal
