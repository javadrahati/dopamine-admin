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



const PostWorkoutModal = ({ item=undefined, onClose=null, onItemUpdated = null, ...restProps }) => {
	const [formData, setFormData] = useState({nameFa: "", nameEn: "", noteFa: "", noteEn: "", instructionFa: "", instructionEn: "", image: "", video: "", met: 0.0, type: 0,})

	const [loading, setLoading] = useState(false)

	useEffect(() => {
		setFormData({
			nameFa: item ? item.nameFa|| "" : "",
			nameEn: item ? item.nameEn|| "" : "",
			noteFa: item ? item.noteFa|| "" : "",
			noteEn: item ? item.noteEn|| "" : "",
			instructionFa: item ? item.instructionFa|| "" : "",
			instructionEn: item ? item.instructionEn|| "" : "",
			met: item ? item.met ??0 : 0,
			type: item ? item.type ?? 0 : 0,
			image: item ? item.image|| "" : "",
			video: item ? item.video||"" : "",
		})
		return () => {}
	}, [item])

	const handleSubmitForm = () => {
		setLoading(true)
		const url = 'workout' + (item && item.id ? ("/" + item.id) : "")
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
				{item ? "ویرایش فعالیت" : "ثبت فعالیت جدید"}
			</CModalHeader>
			<CModalBody>
				<CForm>
					<CRow className="align-items-center">
						<CCol md={12} lg={6}>
							<CContainer className="mb-3">
								<ImageUpload previewUrl={formData.image} onFileUploaded={url => setFormData({...formData, image: url})}/>
							</CContainer>
						</CCol>
						<CCol md={12} lg={6}>
							<VideoUpload previewUrl={formData.video} onFileUploaded={url => setFormData({...formData, video: url})} />
						</CCol>
					</CRow>

					<CRow>
						<CCol md={12} lg={6}>
							<CFormFloating className="mb-3">
								<CFormInput id="input_nameFa" type="text" placeholder=""
								            value={formData.nameFa}
								            onChange={e => setFormData({...formData, nameFa: e.target.value})}
								/>
								<CFormLabel htmlFor="input_nameFa">عنوان فارسی</CFormLabel>
							</CFormFloating>
						</CCol>
						<CCol md={12} lg={6}>
							<CFormFloating className="mb-3">
								<CFormInput id="input_nameEn" type="text" placeholder=""
								            value={formData.nameEn}
								            onChange={e => setFormData({...formData, nameEn: e.target.value})}
								            className="text-end"
								/>
								<CFormLabel htmlFor="input_nameEn">عنوان انگلیسی</CFormLabel>
							</CFormFloating>
						</CCol>
					</CRow>
					<CRow>
						<CCol md={12} lg={6}>
							<CFormFloating className="mb-3">
								<CFormInput id="input_met" type="number" step={0.1} placeholder=""
								            value={formData.met}
								            onChange={e => setFormData({...formData, met: parseFloat(e.target.value)})}
								            disabled={formData.type > 0}
								/>
								<CFormLabel htmlFor="input_met">ضریب MET</CFormLabel>
							</CFormFloating>
						</CCol>
						<CCol md={12} lg={6}>
							<CFormCheck
								id="input_type"
								checked={formData.type > 0}
								label="فعالیت حرفه ای باشگاهی"
								onChange={e => setFormData({...formData, type: formData.type > 0 ? 0 : 1})}
							/>
						</CCol>
					</CRow>
					<CRow >
						<CCol md={12} lg={6}>
							<CFormFloating className="mb-3">
								<CFormInput id="input_noteFa" type="text" placeholder=""
								            value={formData.noteFa}
								            onChange={e => setFormData({...formData, noteFa: e.target.value})}
								/>
								<CFormLabel htmlFor="input_noteFa">یادداشت فارسی</CFormLabel>
							</CFormFloating>
						</CCol>
						<CCol md={12} lg={6}>
							<CFormFloating className="mb-3">
								<CFormInput id="input_noteEn" type="text" placeholder=""
								            value={formData.noteEn}
								            onChange={e => setFormData({...formData, noteEn: e.target.value})}
								            className="text-end"
								/>
								<CFormLabel htmlFor="input_noteEn">یادداشت انگلیسی</CFormLabel>
							</CFormFloating>
						</CCol>
					</CRow>

					<CRow className="mb-3">
						<CFormCheck
							id="input_featured"
							checked={formData.featured}
							label="مطلب برگزیده"
							onChange={e => setFormData({...formData, featured: !formData.featured})}
						/>
					</CRow>

					<CRow className="mb-3">
						<CCol md={12} lg={6}>
							<CFormLabel htmlFor="input_instructionFa">توضیحات فارسی</CFormLabel>
							<CFormTextarea id="input_instructionFa"
							               value={formData.instructionFa}
							               onChange={e => setFormData({...formData, instructionFa: e.target.value})}
							               rows={8}
							/>
						</CCol>
						<CCol md={12} lg={6}>
							<CFormLabel htmlFor="input_instructionEn">توضیحات انگلیسی</CFormLabel>
							<CFormTextarea id="input_instructionEn"
							               value={formData.instructionEn}
							               onChange={e => setFormData({...formData, instructionEn: e.target.value})}
							               rows={8}
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

export default PostWorkoutModal
