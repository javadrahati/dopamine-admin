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
	CForm, CFormCheck, CFormFloating,
	CFormInput, CFormLabel, CFormSwitch, CFormTextarea, CImage,
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
import AudioUpload from "../../helpers/Components/AudioUpload";
import VideoUpload from "../../helpers/Components/VideoUpload";



const PostCounselorModal = ({ item=undefined, onClose=null, onItemUpdated = null, ...restProps }) => {
	const [formData, setFormData] = useState({nameFa: "", nameEn: "", bioFa: "", bioEn: "", introFa: "", introEn: "", avatar: "", price: 0})

	const [file, setFile] = useState("")
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		setFormData({
			nameFa: item ? item.nameFa|| "" : "",
			nameEn: item ? item.nameEn|| "" : "",
			bioFa: item ? item.bioFa|| "" : "",
			bioEn: item ? item.bioEn|| "" : "",
			introFa: item ? item.introFa|| "" : "",
			introEn: item ? item.introEn|| "" : "",
			price: item ? item.price??0 : 0,
			avatar: item ? item.avatar || "" : "",
		})
		return () => {}
	}, [item])

	const handleSubmitForm = () => {
		setLoading(true)
		const url = 'counselor' + (item && item.id ? ("/" + item.id) : "")
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
		<CModal alignment={"center"}  {...restProps} onClose={onClose} size="xl" >
			<CModalHeader closeButton={true}>
				{item ? "ویرایش اطلاعات مشاور" : "ثبت مشاور جدید"}
			</CModalHeader>
			<CModalBody>
				<CForm>
					<CRow className="align-items-center">
						<CCol md={12} lg={6}>
							<CContainer className="mb-3">
								<ImageUpload previewUrl={formData.avatar} onFileUploaded={url => setFormData({...formData, avatar: url})}/>

							</CContainer>
						</CCol>
						<CCol md={12} lg={6}>
							<CFormFloating className="mb-3">
								<CFormInput id="input_nameFa" type="text" placeholder=""
								            value={formData.nameFa}
								            onChange={e => setFormData({...formData, nameFa: e.target.value})}
								/>
								<CFormLabel htmlFor="input_nameFa">نام فارسی</CFormLabel>
							</CFormFloating>
							<CFormFloating className="mb-3">
								<CFormInput id="input_nameEn" type="text" placeholder=""
								            value={formData.nameEn}
								            onChange={e => setFormData({...formData, nameEn: e.target.value})}
								/>
								<CFormLabel htmlFor="input_nameEn">نام انگلیسی</CFormLabel>
							</CFormFloating>
							<CFormFloating className="mb-3">
								<CFormInput id="input_price" type="number" step="1000" placeholder=""
								            value={formData.price}
								            onChange={e => setFormData({...formData, price: parseInt(e.target.value)})}
								/>
								<CFormLabel htmlFor="input_price">هزینه مشاوره ( هر ساعت )</CFormLabel>
							</CFormFloating>
						</CCol>
					</CRow>

					<CRow >
						<CCol md={12} lg={6}>
							<CFormFloating className="mb-3">
								<CFormInput id="input_bioFa" type="text" placeholder=""
								            value={formData.bioFa}
								            onChange={e => setFormData({...formData, bioFa: e.target.value})}
								/>
								<CFormLabel htmlFor="input_bioFa">بیو فارسی</CFormLabel>
							</CFormFloating>
						</CCol>
						<CCol md={12} lg={6}>
							<CFormFloating className="mb-3">
								<CFormInput id="input_bioEn" type="text" placeholder=""
								            value={formData.bioEn}
								            onChange={e => setFormData({...formData, bioEn: e.target.value})}
								            className="text-end"
								/>
								<CFormLabel htmlFor="input_bioEn">بیو انگلیسی</CFormLabel>
							</CFormFloating>
						</CCol>
					</CRow>

					<CRow className="mb-3">
						<CCol md={12} lg={6}>
								<CFormLabel htmlFor="input_textFa">اینترو فارسی</CFormLabel>
								<CFormTextarea id="input_introFa"
								               value={formData.introFa}
								               onChange={e => setFormData({...formData, introFa: e.target.value})}
								               rows={3}
								/>
						</CCol>
						<CCol md={12} lg={6}>
							<CFormLabel htmlFor="input_introEn">اینترو انگلیسی</CFormLabel>
							<CFormTextarea id="input_introEn"
							               value={formData.introEn}
							               onChange={e => setFormData({...formData, introEn: e.target.value})}
							               rows={3}
							               className="text-end"
							/>
						</CCol>
					</CRow>

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

export default PostCounselorModal
