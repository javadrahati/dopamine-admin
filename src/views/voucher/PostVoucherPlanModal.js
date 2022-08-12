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
	CFormInput, CFormLabel, CFormSelect, CFormSwitch, CFormTextarea, CImage,
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


const voucherTypeOptions = [
	{value: 0, label: "اشتراک ویژه اپلیکیشن"},
	{value: 1, label: "اشتراک برنامه تغذیه و تمرین"},
]

const PostVoucherPlanModal = ({ item=undefined, onClose=null, onItemUpdated = null, ...restProps }) => {
	const [formData, setFormData] = useState({titleFa: "", titleEn: "", descriptionFa: "", descriptionEn: "", type: 0, price: 0, days: 30, trainer_id: 0})

	const [loading, setLoading] = useState(false)
	const [trainers, setTrainers] = useState([])

	useEffect(() => {
		setFormData({
			titleFa: item ? item.titleFa|| "" : "",
			titleEn: item ? item.titleEn|| "" : "",
			descriptionFa: item ? item.descriptionFa|| "" : "",
			descriptionEn: item ? item.descriptionEn|| "" : "",
			price: item ? item.price ?? 0 : 0,
			days: item ? item.days ?? 30 : 30,
			type: item ? item.type ?? 0 : 0,
			trainer_id: item ? item.trainer_id ?? 0 : 0,
		})
		fetchTrainers()
		return () => {}
	}, [item])

	const fetchTrainers = () => {
		if(trainers.length <= 0) {
			Axios.get('trainer')
				.then(res => setTrainers(res.data))
				.catch(err => console.log("err", err))
		}
	}

	const handleSubmitForm = () => {
		setLoading(true)
		const url = 'voucherPlan' + (item && item.id ? ("/" + item.id) : "")
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
				{item ? "ویرایش پلن اشتراکی" : "ثبت پلن جدید"}
			</CModalHeader>
			<CModalBody>
				<CForm>
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
					<CRow>
						<CCol md={12} lg={6}>
							<CFormFloating className="mb-3">
								<CFormInput id="input_days" type="number" step={1} placeholder=""
								            value={formData.days}
								            onChange={e => setFormData({...formData, days: parseInt(e.target.value)})}
								/>
								<CFormLabel htmlFor="input_days">بازه اشتراک (روز)</CFormLabel>
							</CFormFloating>
						</CCol>
						<CCol md={12} lg={6}>
							<CFormFloating className="mb-3">
								<CFormInput id="input_price" type="number" step={1000} placeholder=""
								            value={formData.price}
								            onChange={e => setFormData({...formData, price: parseInt(e.target.value)})}
								/>
								<CFormLabel htmlFor="input_price">قیمت (تومان)</CFormLabel>
							</CFormFloating>
						</CCol>
					</CRow>

					<CRow>
						<CCol md={12} lg={6}>
							<CFormSelect id="input_type" className="mb-3"
							             value={formData.type}
							             options={voucherTypeOptions}
							             onChange={e => setFormData({...formData, type: parseInt(e.target.value)})}
							/>
						</CCol>
						<CCol md={12} lg={6}>
							<CFormSelect id="input_trainer_id" className="mb-3"
							             value={formData.trainer_id}
							             disabled={formData.type === 0}
							             options={[{value: 0, label: "انتخاب مربی"}].concat(trainers.map(e => ({value: e.id, label:e.nameFa})))}
							             onChange={e => setFormData({...formData, trainer_id: parseInt(e.target.value)})}
							/>
						</CCol>
					</CRow>

					<CRow className="mb-3">
						<CCol md={12} lg={6}>
							<CFormLabel className={"extra-small"} htmlFor="input_descriptionFa">توضیحات فارسی</CFormLabel>
							<CFormTextarea id="input_descriptionFa"
							               value={formData.descriptionFa}
							               onChange={e => setFormData({...formData, descriptionFa: e.target.value})}
							               rows={4}
							/>
						</CCol>
						<CCol md={12} lg={6}>
							<CFormLabel className={"extra-small"} htmlFor="input_descriptionEn">توضیحات انگلیسی</CFormLabel>
							<CFormTextarea id="input_descriptionEn"
							               value={formData.descriptionEn}
							               onChange={e => setFormData({...formData, descriptionEn: e.target.value})}
							               rows={4}
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

export default PostVoucherPlanModal
