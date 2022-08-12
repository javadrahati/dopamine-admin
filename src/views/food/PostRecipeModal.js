import React, {useEffect, useState} from "react";
import {
	CAlert,
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
	CFormInput, CFormLabel, CFormTextarea, CImage,
	CModal,
	CModalBody,
	CModalFooter,
	CModalHeader,
	CRow,
	CTooltip
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {cilPen, cilPencil, cilTrash, cilWarning, cilX} from "@coreui/icons";
import CLoadingButton from "../../helpers/Components/CLoadingButton";
import ImageUpload from "../../helpers/Components/ImageUpload";
import Axios from "../../helpers/axios/Axios";
import CMultiSelect from "../../helpers/Components/CMultiSelect";
import SelectFoodModal from "../program/SelectFoodModal";
import FoodItemView from "./FoodItemView";



const ACTION = {
	EVENT_SELECT_FOOD: 1,
}
const PostRecipeModal = ({ item=undefined, onClose=null, onItemUpdated = null, ...restProps }) => {
	const [formData, setFormData] = useState({textFa: "", textEn: "", image: ""})
	const [food, setFood] = useState(null)
	const [file, setFile] = useState("")
	const [loading, setLoading] = useState(false)
	const [action, setAction] = useState(0)

	useEffect(() => {
		setFormData({
			image: item ? item.image|| "" : "",
			textFa: item ? item.textFa|| "" : "",
			textEn: item ? item.textEn|| "" : "",
			food_id: item ? item.food_id : null,
		})
		setFood(item ? item.food : null)

		return () => {}
	}, [item])



	const handleSubmitForm = () => {
		setLoading(true)
		const url = 'recipe' + (item && item.id ? ("/" + item.id) : "")
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
		<div>
			<CModal alignment={"center"}  {...restProps} onClose={onClose} size="lg">
				<CModalHeader closeButton={true}>
					{item ? "ویرایش دستور پخت" : "ثبت دستور پخت جدید"}
				</CModalHeader>
				<CModalBody>
					<CForm>
						<CRow className="mb-3">
							<CCol xs={12} lg={6}>
								<ImageUpload previewUrl={formData.image} onFileUploaded={url => setFormData({...formData, image: url})}/>
							</CCol>
							<CCol xs={12} lg={6}>
								{food ? (
									<CRow xs={{cols:'auto'}} className="align-items-center justify-content-between bg-dark mx-1 rounded rounded-1">
										<CCol>
											<CRow xs={{cols:'auto'}} className="align-items-center justify-content-center">
												<CCol>
													<CCardText className="m-0 text-light">{food.nameFa ?? ""}</CCardText>
													<CCardText className="m-0 extra-small text-secondary">{food.calorieTextFa || ""}</CCardText>
												</CCol>
											</CRow>
										</CCol>
										<CCol className="p-0">
											<CTooltip content={"تغییر غذای انتخاب شده"} >
												<CIcon icon={cilX} className={"text-light"} onClick={() => setFood(undefined)}/>
											</CTooltip>
										</CCol>
									</CRow>
								) : (
									<CAlert color="danger" variant="solid" className="d-flex align-items-center"
									        onClick={() => setAction(ACTION.EVENT_SELECT_FOOD)}>
										<CIcon icon={cilWarning} className="flex-shrink-0 me-2" width={24} height={24} />
										<span className="text-decoration-underline">غذای مورد نظر را انتخاب کنید</span>
									</CAlert>
								)}
							</CCol>
						</CRow>
						<CRow>
							<CCol xs={12}>
								<CFormLabel htmlFor="input_textFa">متن فارسی</CFormLabel>
								<CFormTextarea id="input_textFa" type="text" placeholder="عسل"
								               value={formData.textFa}
								               rows={8}
								               onChange={e => setFormData({...formData, textFa: e.target.value})}
								/>
							</CCol>
							<CCol xs={12}>
								<CFormLabel htmlFor="input_textEn">متن انگلیسی</CFormLabel>
								<CFormTextarea id="input_textEn" type="text" placeholder="Honey"
								               value={formData.textEn}
								               rows={8}
								               className="text-end"
								               onChange={e => setFormData({...formData, textEn: e.target.value})}
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

			<SelectFoodModal
				visible={action === ACTION.EVENT_SELECT_FOOD}
				onClose={() => setAction(0)}
				onItemSelected={food => {
					setFood(food)
					setFormData({...formData, food_id: food.id})
					setAction(0)
				}}
			/>
		</div>

	)
}

export default PostRecipeModal
