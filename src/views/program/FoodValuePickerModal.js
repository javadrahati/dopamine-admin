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

const Modal = ({ food = null, groups = [], visible = false, onClose=null, onItemSelected = null, ...restProps }) => {

	const [selectedGroupIndices, setSelectedGroupIndices] = useState([])
	const [selectedDays, setSelectedDays] = useState([])
	const [activeUnit, setActiveUnit] = useState({})
	const [value, setValue] = useState(0)
	const [sliderMax, setSliderMax] = useState(100)
	const [sliderStep, setSliderStep] = useState(100)
	const infoRef = useRef({calorie:0, carbs: 0, fat: 0, protein: 0})

	useEffect(() => {
		if(food && food.units && food.units.length > 0) {
			setActiveUnit(food.units[0])
		} else {
			setActiveUnit({})
		}
		return () => {}
	}, [food])

	useEffect(() => {
		if(!activeUnit) {
			setValue(0)
		} else {
			const number = activeUnit ? activeUnit.number ?? 1 : 1
			setValue(number)
			setSliderMax(Math.max(100, 10 * number))
			setSliderStep(number<10 ? 1 : number<50 ? 5 : number < 100 ? 10 : Math.round(number / 10))
		}
		return () => {}
	}, [activeUnit])

	const handleSubmit = () => {
		onItemSelected(selectedDays, selectedGroupIndices, food, activeUnit, value, infoRef.current)
	}

	const toggleGroupSelection = (idx) => {
		if(selectedGroupIndices.indexOf(idx) < 0) {
			setSelectedGroupIndices(selectedGroupIndices.concat(idx))
		} else {
			setSelectedGroupIndices(selectedGroupIndices.filter(e => e !== idx))
		}
	}

	const toggleDaySelection = (idx) => {
		if(selectedDays.indexOf(idx) < 0) {
			setSelectedDays(selectedDays.concat(idx))
		} else {
			setSelectedDays(selectedDays.filter(e => e !== idx))
		}
	}

	const progressViews = () => {
		if(!activeUnit) return null

		const calorieVal = ( (activeUnit.calorie??0) * value / activeUnit.number )
		const proteinVal = ( (activeUnit.protein) * value / activeUnit.number)
		const carbsVal = ( (activeUnit.carbs) * value / activeUnit.number)
		const fatVal = ( (activeUnit.fat) * value / activeUnit.number)


		infoRef.current = {calorie: calorieVal, protein: proteinVal, carbs: carbsVal, fat: fatVal}

		let max = 1.1 * Math.max(carbsVal, fatVal, proteinVal)
		if(max <= 0) max = 100
		const calorieProgress = Math.round( calorieVal * 100 / (calorieVal < 100 ? 100 : calorieVal < 500 ? 500 : calorieVal < 1000 ? 1000 : calorieVal < 2000 ? 2000 : 5000))
		return (
			[
				{c: "success", l: "کالری", x: calorieVal.toFixed(0), p:calorieProgress },
				{c: "primary", l: "پروتئین", x: proteinVal.toFixed(0), p:( proteinVal * 100 / max) },
				{c: "danger", l: "کربوهیدرات", x: carbsVal.toFixed(0), p:( carbsVal * 100 / max) },
				{c: "warning", l: "چربی", x: fatVal.toFixed(0), p:( proteinVal * 100 / max) },
			].map((e, idx) =>
				<CRow className="my-1" key={1+idx}>
					<CCol xs={3} className="small">{e.l ?? ""}</CCol>
					<CCol xs={9}>
						<CProgress className="my-1">
							<CProgressBar value={ e.p ?? 0} color={e.c}>{e.x ?? ""}</CProgressBar>
						</CProgress>
					</CCol>
				</CRow>
			)
		)
	}

	const groupsView = !groups ? null : <div className="mb-3">
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
		<div className="small mt-3">وعده غذایی:</div>
		{groups.map(g => {
			const isSelected = selectedGroupIndices.indexOf(g.index) >= 0
			return (
				<CBadge
					key={g.index}
					color={isSelected ? "primary" : "light"}
					textColor={isSelected ? "light" : "dark"}
					className="px-3 py-2 m-1"
					onClick={() => toggleGroupSelection(g.index)}
				>
					{g.label ?? ""}
				</CBadge>
			)}
		)}
	</div>


	const errorMessageView = (selectedDays.length <= 0 || value <= 0 || selectedGroupIndices.length <= 0) ? (
		<CAlert className="w-100"
				color="danger"
				visible={value <= 0 || selectedDays.length <=0 || selectedGroupIndices.length <= 0}>
			<CIcon icon={cilWarning} className="flex-shrink-0 me-2" width={24} height={24} />
			<span>
			{selectedDays.length <= 0 || selectedGroupIndices.length <= 0 ? "روز و وعده‌های غذایی را انتخاب کنید" :
				value <= 0 ? "مقدار را به درستی وارد کنید" : ""}
			</span>
		</CAlert> ) : null

	return (
		<CModal backdrop={"static"} alignment={"top"} visible={visible} onClose={onClose} size="lg" {...restProps}>
			<CModalHeader closeButton={true}>
				<CRow xs={{cols:'auto'}} className="align-items-center justify-content-between">
					<CCol>
						<CRow xs={{cols:'auto'}} className="align-items-center">
							<CCol>
								<CImage src={food ? food.image ?? "" : ""} align="center" height={40} rounded className="bg-secondary"/>
							</CCol>
							<CCol>
								<CCardText className="small m-0">{food ? (food.nameFa ?? (food.nameEn ??"")) : ""}</CCardText>
								<CCardText className="small m-0 extra-small text-secondary">{food ? (food.calorieTextFa ?? "") : ""}</CCardText>
							</CCol>
						</CRow>
					</CCol>
				</CRow>
			</CModalHeader>
			{food && (
				<CModalBody>

					{groupsView}

					<CNav variant="tabs" className="">
						<CNavItem>
							<CNavLink disabled>واحد:</CNavLink>
						</CNavItem>
						{food.units && food.units.map((unit) => (
							<CNavItem key={unit.id}>
								<CNavLink active={(activeUnit.id??0) === unit.id} onClick={() => setActiveUnit(unit)}>
									{unit.nameFa ?? (unit.nameEn ?? "")}
								</CNavLink>
							</CNavItem>
						))}
					</CNav>
					<CTabContent className="my-2">
						{food.units && food.units.map((unit) => (
							<CTabPane role="tabpanel" key={unit.id} visible={(activeUnit.id??0) === unit.id}>
								<CContainer>
									<CRow>
										<CCol xs={12} lg={6}>
											<CFormLabel htmlFor="input_value" className="small">مقدار:
												<span className="text-danger mx-2 ">{`${value} __ ${activeUnit.nameFa ?? ""}`}</span>
											</CFormLabel>
											<CFormRange
												min={0} max={sliderMax}  step={sliderStep}
												className="dir-ltr"
												value={value}
												onChange={e =>setValue(parseInt(e.target.value))}/>
											<CFormInput id="input_value"
														type="number"
														step={sliderStep}
														value={value}
														onChange={e => setValue(parseInt(e.target.value))}/>
										</CCol>
										<CCol xs={12} lg={6}>
											{progressViews()}
										</CCol>
									</CRow>
								</CContainer>

							</CTabPane>
						))}
					</CTabContent>
				</CModalBody>
			)}
			<CModalFooter>
				{errorMessageView}
				<CLoadingButton className="w-100" color="primary" onClick={handleSubmit} disabled={value <= 0 || selectedGroupIndices.length <= 0 || selectedDays.length <= 0}>تایید</CLoadingButton>
			</CModalFooter>
		</CModal>
	)
}

export default Modal
