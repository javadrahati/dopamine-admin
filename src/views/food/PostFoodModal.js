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
import CMultiSelect from "../../helpers/Components/CMultiSelect";



const PostFoodModal = ({ item=undefined, onClose=null, onItemUpdated = null, ...restProps }) => {
	const [formData, setFormData] = useState({nameFa: "", nameEn: "", image: "", categoryIds:[]})
	const [file, setFile] = useState("")
	const [loading, setLoading] = useState(false)
	const [catOptions, setCatOptions] = useState([])

	useEffect(() => {
			setFormData({
				nameFa: item ? item.nameFa|| "" : "",
				nameEn: item ? item.nameEn|| "" : "",
				image: item ? item.image|| "" : "",
				barcode: item ? item.barcode||"" : "",
				categoryIds: item && item.categories ? item.categories.map(e => e.id) : [],
			})

			return () => {}
		}, [item])

	useEffect(() => {
		if(catOptions == null || catOptions.length <= 0) {
			Axios.get('foodcategory')
				.then(res => {
					setCatOptions(res.data.map(e => ({value: e.id, text: e.nameFa}) ))
				})
				.catch(err => {})
		}
		return () => {}
	});

	const handleSubmitForm = () => {
		setLoading(true)
		const url = 'food' + (item && item.id ? ("/" + item.id) : "")
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
				{item ? "ویرایش غذا" : "ثبت غذای جدید"}
			</CModalHeader>
			<CModalBody>
				<CForm>
					<CRow>
						<CCol md={12} lg={6}>
							<CContainer className="mb-3">
								<ImageUpload previewUrl={formData.image} onFileUploaded={url => setFormData({...formData, image: url})}/>
							</CContainer>
						</CCol>
						<CCol md={12} lg={6}>
							<div>
								<CFormLabel className="small" htmlFor="input_cat_ids">دسته بندی ها</CFormLabel>
								<CMultiSelect
									id={"input_cat_ids"}
									options={catOptions}
									values={formData.categoryIds}
									placeholder={"انتخاب دسته بندی"}
									onSelectionUpdate={selections => {
										setFormData({...formData, categoryIds: selections.map(e => e.value)})
									}}
								/>
							</div>
						</CCol>
					</CRow>
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
					<CFormFloating className="mb-3">
						<CFormInput id="input_barcode" type="text" placeholder="123456789..."
						            value={formData.barcode}
						            onChange={e => setFormData({...formData, barcode: e.target.value})}
						/>
						<CFormLabel htmlFor="input_barcode">بارکد</CFormLabel>
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

export default PostFoodModal
