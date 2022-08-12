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



const PostBlogModal = ({ item=undefined, onClose=null, onItemUpdated = null, ...restProps }) => {
	const [formData, setFormData] = useState({titleFa: "", titleEn: "", subtitleFa: "", subtitleEn: "", textFa: "", textEn: "", featured:false, image: "", voice: "", video: ""})

	const [file, setFile] = useState("")
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		setFormData({
			titleFa: item ? item.titleFa|| "" : "",
			titleEn: item ? item.titleEn|| "" : "",
			subtitleFa: item ? item.subtitleFa|| "" : "",
			subtitleEn: item ? item.subtitleEn|| "" : "",
			textFa: item ? item.textFa|| "" : "",
			textEn: item ? item.textEn|| "" : "",
			featured: item && item.featured,
			image: item ? item.image|| "" : "",
			barcode: item ? item.barcode||"" : "",
			voice: item ? item.voice||"" : "",
			video: item ? item.video||"" : "",
		})
		return () => {}
	}, [item])

	const handleSubmitForm = () => {
		setLoading(true)
		const url = 'blog' + (item && item.id ? ("/" + item.id) : "")
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
			<CModalHeader closeButton={false}>
				{item ? "ویرایش مطلب" : "ثبت مطلب جدید"}
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
							<AudioUpload previewUrl={formData.voice} onFileUploaded={url => setFormData({...formData, voice: url})} />
							<VideoUpload previewUrl={formData.video} onFileUploaded={url => setFormData({...formData, video: url})} />
						</CCol>
					</CRow>

					<CRow>
						<CCol md={12} lg={6}>
							<CFormFloating className="mb-3">
								<CFormInput id="input_titleFa" type="text" placeholder=""
											value={formData.titleFa}
											onChange={e => setFormData({...formData, titleFa: e.target.value})}
								/>
								<CFormLabel htmlFor="input_titleFa">عنوان فارسی</CFormLabel>
							</CFormFloating>
						</CCol>
						<CCol md={12} lg={6}>
							<CFormFloating className="mb-3">
								<CFormInput id="input_titleEn" type="text" placeholder=""
											value={formData.titleEn}
											onChange={e => setFormData({...formData, titleEn: e.target.value})}
											className="text-end"
								/>
								<CFormLabel htmlFor="input_titleEn">عنوان انگلیسی</CFormLabel>
							</CFormFloating>
						</CCol>
					</CRow>

					<CRow >
						<CCol md={12} lg={6}>
							<CFormFloating className="mb-3">
								<CFormInput id="input_subtitleFa" type="text" placeholder=""
								            value={formData.subtitleFa}
								            onChange={e => setFormData({...formData, subtitleFa: e.target.value})}
								/>
								<CFormLabel htmlFor="input_subtitleFa">هدر فارسی</CFormLabel>
							</CFormFloating>
						</CCol>
						<CCol md={12} lg={6}>
							<CFormFloating className="mb-3">
								<CFormInput id="input_subtitleEn" type="text" placeholder=""
								            value={formData.subtitleEn}
								            onChange={e => setFormData({...formData, subtitleEn: e.target.value})}
								            className="text-end"
								/>
								<CFormLabel htmlFor="input_subtitleEn">هدر انگلیسی</CFormLabel>
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
								<CFormLabel htmlFor="input_textFa">متن فارسی</CFormLabel>
								<CFormTextarea id="input_textFa"
								               value={formData.textFa}
								               onChange={e => setFormData({...formData, textFa: e.target.value})}
								               rows={8}
								/>
						</CCol>
						<CCol md={12} lg={6}>
							<CFormLabel htmlFor="input_textEn">متن انگلیسی</CFormLabel>
							<CFormTextarea id="input_textEn"
							               value={formData.textEn}
							               onChange={e => setFormData({...formData, textEn: e.target.value})}
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

export default PostBlogModal
