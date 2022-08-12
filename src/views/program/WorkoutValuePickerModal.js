import React, {useEffect, useRef, useState} from "react";
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
	CFormInput, CFormLabel, CFormRange, CFormText, CHeader, CHeaderDivider, CImage, CListGroup, CListGroupItem,
	CModal,
	CModalBody,
	CModalFooter,
	CModalHeader, CNav, CNavItem, CNavLink, CProgress, CProgressBar,
	CRow, CSpinner, CTabContent, CTabPane,
	CTooltip
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {cilCheck, cilPen, cilPencil, cilTrash, cilWarning, cilX} from "@coreui/icons";
import CLoadingButton from "../../helpers/Components/CLoadingButton";
import ImageUpload from "../../helpers/Components/ImageUpload";
import Axios from "../../helpers/axios/Axios";


const MSG = {
	weekdays: [
		"شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه"
	],
}

const Modal = ({ workout = null, visible = false, onClose=null, onItemSelected = null, ...restProps }) => {

	const [selectedDays, setSelectedDays] = useState([])
	const [value, setValue] = useState({_duration: 0, _set: 0, _count: 0})

	const [sliderMax, setSliderMax] = useState(100)
	const [sliderStep, setSliderStep] = useState(100)


	useEffect(() => {
		setValue({_duration: 0, _set: 0, _count: 0, _note: ""})
		return () => {}
	}, [workout])

	const handleSubmit = () => {
		onItemSelected(selectedDays, workout, value)
	}

	const toggleDaySelection = (idx) => {
		if(selectedDays.indexOf(idx) < 0) {
			setSelectedDays(selectedDays.concat(idx))
		} else {
			setSelectedDays(selectedDays.filter(e => e !== idx))
		}
	}

	const isValidValue = () => value && ( value._duration > 0 || (value._set > 0 && value._count > 0) )


	const daysView = <div className="mb-3">
		<div className="small">روز:</div>
		{MSG.weekdays.map((label, idx) => {
			const isSelected = selectedDays.indexOf(idx) >= 0
			return (
				<CBadge
					key={idx}
					color={isSelected ? "primary" : "light"}
					textColor={isSelected ? "light" : "dark"}
					className="px-3 py-2 m-1"
					onClick={() => toggleDaySelection(idx)}
				>
					<CIcon icon={isSelected ? cilCheck : cilWarning} size={"sm"}/>
					<span className="m-1">{label}</span>
				</CBadge>
			)}
		)}
	</div>

	const errorMessageView = (selectedDays.length <= 0 || !isValidValue() ) ? (
		<CAlert className="w-100"
				color="danger"
				visible={selectedDays.length <=0 || !isValidValue()}>
			<CIcon icon={cilWarning} className="flex-shrink-0 me-2" width={24} height={24} />
			<span>
			{selectedDays.length <= 0 ? "روز تمرین را انتخاب کنید" : "مقدار را به درستی وارد کنید"}
			</span>
		</CAlert> ) : null

	return (
		<CModal backdrop={"static"} alignment={"top"} visible={visible} onClose={onClose} size="lg" {...restProps}>
			<CModalHeader closeButton={true}>
				<CRow xs={{cols:'auto'}} className="align-items-center justify-content-between">
					<CCol>
						<CRow xs={{cols:'auto'}} className="align-items-center">
							<CCol>
								<CImage src={workout ? workout.image ?? "" : ""} align="center" height={40} rounded className="bg-secondary"/>
							</CCol>
							<CCol>
								<CCardText className="small m-0">{workout ? (workout.nameFa ?? (workout.nameEn ??"")) : ""}</CCardText>
								<CCardText className="small m-0 extra-small text-secondary">{workout ? (workout.calorieTextFa ?? "") : ""}</CCardText>
							</CCol>
						</CRow>
					</CCol>
				</CRow>
			</CModalHeader>
			{workout && (
				<CModalBody>
					{daysView}
					<CTabContent className="my-2">
						<CTabPane role="tabpanel" key={workout.id} visible={true}>
							<CContainer>
								<CRow className={workout.type !== 0 ? "hidden" : ""}>
									<CCol xs={12} lg={6}>
										<CFormLabel htmlFor="input_value_duration" className="small">زمان:
											<span className="text-danger small mx-2 ">{`${value._duration} دقیقه`}</span>
										</CFormLabel>
										<CFormRange
											min={0} max={240} step={5}
											className="dir-ltr"
											value={value._duration}
											onChange={e =>{setValue({...value, _duration: parseInt(e.target.value)})}}/>
										<CFormInput id="input_value_duration"
													type="number"
													step={5}
													value={value._duration}
													onChange={e =>{setValue({...value, _duration: parseInt(e.target.value)})}}/>
									</CCol>
									<CCol xs={12} lg={6}>

									</CCol>
								</CRow>
								<CRow className={workout.type !== 1 ? "hidden" : ""}>
									<CCol xs={12} lg={6}>
										<CFormLabel htmlFor="input_value_set" className="small">ست:
											<span className="text-danger small mx-2 ">{`${value._set} ست باید این حرکت اجرا بشه`}</span>
										</CFormLabel>
										<CFormRange
											min={0} max={20} step={1}
											className="dir-ltr"
											value={value._set}
											onChange={e =>{setValue({...value, _set: parseInt(e.target.value)})}}/>
										<CFormInput id="input_value_set"
													type="number"
													step={1}
													value={value._set}
													onChange={e =>{setValue({...value, _set: parseInt(e.target.value)})}}/>
									</CCol>
									<CCol xs={12} lg={6}>
										<CFormLabel htmlFor="input_value_cnt" className="small">تعداد:
											<span className="text-danger small mx-2 ">{`${value._count} بار در هر ست باید اجرا بشه`}</span>
										</CFormLabel>
										<CFormRange
											min={0} max={20} step={1}
											className="dir-ltr"
											value={value._count}
											onChange={e =>{setValue({...value, _count: parseInt(e.target.value)})}}/>
										<CFormInput id="input_value_cnt"
													type="number"
													step={1}
													value={value._count}
													onChange={e =>{setValue({...value, _count: parseInt(e.target.value)})}}/>
									</CCol>
								</CRow>
								<CRow className={"mt-2"}>
									<CCol xs={12}>
										<CFormLabel htmlFor="input_value_note" className="small">یادداشت مربی:
										</CFormLabel>
										<CFormInput id="input_value_note"
													type="text"
													step={1}
													value={value._note}
													placeholder={"یادداشت شما برای کلاینت"}
													onChange={e =>{setValue({...value, _note: e.target.value})}}/>
									</CCol>
								</CRow>
							</CContainer>

						</CTabPane>
					</CTabContent>
				</CModalBody>
			)}
			<CModalFooter>
				{errorMessageView}
				<CLoadingButton className="w-100" color="primary" onClick={handleSubmit} disabled={selectedDays.length <= 0 || !isValidValue()}>تایید</CLoadingButton>
			</CModalFooter>
		</CModal>
	)
}

export default Modal
