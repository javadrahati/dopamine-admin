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



const PostFoodUnitModal = ({ item=undefined, onClose=null, onItemUpdated = null, ...restProps }) => {
	const [formData, setFormData] = useState({food_id: 0, nameFa: "", nameEn: "", number: 1, fiber: 0, protein: 0, carbs: 0, fat: 0})
	const [loading, setLoading] = useState(false)

	useEffect(() => {
			setFormData({
				food_id: item ? item.food_id: 0,
				nameFa: item ? item.nameFa|| "" : "",
				nameEn: item ? item.nameEn|| "" : "",
				number: item ? item.number || 1 : 1,
				fiber: item ? item.fiber : 0,
				protein: item ? item.protein : 0,
				carbs: item ? item.carbs : 0,
				fat: item? item.fat : 0,
			})

			return () => {}
		}, [item])

	const handleSubmitForm = () => {
		setLoading(true)
		const url = 'foodUnit' + (item && item.id ? ("/" + item.id) : "")
		Axios.post(url, formData)
			.then(res => {
				setLoading(false)
				if(onItemUpdated) {
					onItemUpdated(res.data)
				}
				if(onClose) onClose()
			})
			.catch(err => {
				setLoading(false)
				if(onClose) onClose()
			});
	}

	return (
		<CModal alignment={"center"}  {...restProps} onClose={onClose} size="lg">
			<CModalHeader closeButton={true}>
				{item && item.id ? "ویرایش واحد غذایی" : "واحد غذایی جدید"}
			</CModalHeader>
			<CModalBody>
				<CForm>
					<CFormFloating className="mb-1">
						<CFormInput id="input_food_id" type="text" placeholder="عسل"
									value={formData.food_id}
									disabled
						/>
						<CFormLabel htmlFor="input_food_id">شناسه غذا</CFormLabel>
					</CFormFloating>
					<CFormFloating className="mb-1">
						<CFormInput id="input_nameFa" type="text" placeholder="عسل"
						            value={formData.nameFa}
						            onChange={e => setFormData({...formData, nameFa: e.target.value})}
						/>
						<CFormLabel htmlFor="input_nameFa">نام فارسی</CFormLabel>
					</CFormFloating>
					<CFormFloating className="mb-1">
						<CFormInput id="input_nameEn" type="text" placeholder="Honey"
						            value={formData.nameEn}
						            onChange={e => setFormData({...formData, nameEn: e.target.value})}
						/>
						<CFormLabel htmlFor="input_nameEn">نام انگلیسی</CFormLabel>
					</CFormFloating>
					<CFormFloating className="mb-1">
						<CFormInput id="input_number" type="number" placeholder="مقدار"
									value={formData.number}
									onChange={e => setFormData({...formData, number: parseInt(e.target.value) })}
						/>
						<CFormLabel htmlFor="input_number">مقدار</CFormLabel>
					</CFormFloating>
					<CFormFloating className="mb-1">
						<CFormInput id="input_carbs" type="number" placeholder="کربوهیدرات"
									value={formData.carbs}
									step={0.01}
									onChange={e => setFormData({...formData, carbs: parseFloat(e.target.value) })}
						/>
						<CFormLabel htmlFor="input_carbs">کربوهیدرات</CFormLabel>
					</CFormFloating>
					<CFormFloating className="mb-1">
						<CFormInput id="input_" type="number" placeholder="پروتئین"
									value={formData.protein}
									step={0.01}
									onChange={e => setFormData({...formData, protein: parseFloat(e.target.value) })}
						/>
						<CFormLabel htmlFor="input_carbs">پروتئین</CFormLabel>
					</CFormFloating>
					<CFormFloating className="mb-1">
						<CFormInput id="input_" type="number" placeholder="چربی"
									value={formData.fat}
									step={0.01}
									onChange={e => setFormData({...formData, fat: parseFloat(e.target.value) })}
						/>
						<CFormLabel htmlFor="input_carbs">چربی</CFormLabel>
					</CFormFloating>
					<CFormFloating className="mb-1">
						<CFormInput id="input_" type="number" placeholder="فیبر"
									value={formData.fiber}
									step={0.01}
									onChange={e => setFormData({...formData, fiber: parseFloat(e.target.value) })}
						/>
						<CFormLabel htmlFor="input_carbs">فیبر</CFormLabel>
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

export default PostFoodUnitModal
