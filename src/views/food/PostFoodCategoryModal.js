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



const PostFoodCategoryModal = ({ item=undefined, onClose=null, onItemUpdated = null, ...restProps }) => {
	const [formData, setFormData] = useState({nameFa: "", nameEn: "", image: ""})
	const [file, setFile] = useState("")
	const [loading, setLoading] = useState(false)

	useEffect(() => {
			setFormData({
				nameFa: item ? item.nameFa|| "" : "",
				nameEn: item ? item.nameEn|| "" : "",
				image: item ? item.image|| "" : "",
			})
			return () => {}
		}, [item])

	const handleSubmitForm = () => {
		setLoading(true)
		const url = 'foodcategory' + (item ? ("/" + item.id) : "")
		Axios.post(url, formData)
			.then(res => {
				setLoading(false)
				if(onItemUpdated) {
					onItemUpdated(res.data)
				}
			})
			.catch(err => {
				setLoading(false)
				if(onClose) onClose()
			});
	}

	return (
		<CModal alignment={"center"}  {...restProps} onClose={onClose} size="lg">
			<CModalHeader closeButton={true}>
				{item ? "ویرایش" : "افزودن"}
			</CModalHeader>
			<CModalBody>
				<CForm>
					<CContainer className="mb-3">
						<ImageUpload previewUrl={formData.image} onFileUploaded={url => setFormData({...formData, image: url})}/>
					</CContainer>
					<CFormFloating className="mb-3">
						<CFormInput id="input_nameFa" type="text" placeholder="عسل"
						            value={formData.nameFa}
						            onChange={e => setFormData({...formData, nameFa: e.target.value})}
						/>
						<CFormLabel htmlFor="input_nameFa">نام فارسی</CFormLabel>
					</CFormFloating>
					<CFormFloating className="mb-3">
						<CFormInput id="input_nameEn" type="text" placeholder="Honey"
						            value={formData.nameEn}
						            onChange={e => setFormData({...formData, nameEn: e.target.value})}
						/>
						<CFormLabel htmlFor="input_nameEn">نام انگلیسی</CFormLabel>
					</CFormFloating>
				</CForm>
			</CModalBody>
			<CModalFooter>
				{ onClose != null &&
				<CButton variant="ghost" color="dark" onClick={onClose}>بستن</CButton>
				}
				<CLoadingButton loading={loading} color="primary" variant="outline" onClick={handleSubmitForm}>تایید</CLoadingButton>
			</CModalFooter>
		</CModal>
	)
}

export default PostFoodCategoryModal
