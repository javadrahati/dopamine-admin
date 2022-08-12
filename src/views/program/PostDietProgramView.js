import React, {useEffect, useRef, useState} from "react";
import {
	CAccordion,
	CAccordionBody,
	CAccordionButton,
	CAccordionCollapse,
	CAccordionHeader,
	CAccordionItem,
	CAlert,
	CAlertLink,
	CAvatar,
	CBadge,
	CButton,
	CCard,
	CCardBody, CCardFooter,
	CCardHeader,
	CCardText,
	CCloseButton,
	CCol,
	CContainer,
	CDropdownDivider,
	CFormInput,
	CFormLabel,
	CFormRange,
	CHeaderDivider,
	CImage,
	CLink,
	CNav,
	CNavItem,
	CRow,
	CTable,
	CTableBody,
	CTableHead,
	CTableHeaderCell,
	CTableRow,
	CToast,
	CToastBody, CToastClose,
	CToaster,
	CToastHeader,
	CTooltip
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {
	cilAperture,
	cilArrowCircleLeft,
	cilCheck, cilCheckCircle,
	cilClosedCaptioning,
	cilDelete, cilDialpad,
	cilEnvelopeClosed, cilHeader,
	cilInfo, cilLineSpacing, cilListNumbered, cilPen,
	cilPencil, cilPlus,
	cilTrash, cilUserFemale,
	cilWarning, cilWeightlifitng, cilX
} from "@coreui/icons";
import SelectUserModal from "./SelectUserModal";
import {formatNumber} from "chart.js/helpers";
import DietItemsWeekdaysView from "./DietItemsWeekdaysView";
import SelectFoodModal from "./SelectFoodModal";
import FoodValuePickerModal from "./FoodValuePickerModal";
import Local from "../../helpers/storage/Local";
import CLoadingButton from "../../helpers/Components/CLoadingButton";
import Axios from "../../helpers/axios/Axios";
import Context from "react-redux/lib/components/Context";
import SelectWorkoutModal from "./SelectWorkoutModal";
import WorkoutItemsWeekdaysView from "./WorkoutItemsWeekdaysView";
import WorkoutValuePickerModal from "./WorkoutValuePickerModal";


const MSG = {
	choose_user: "کاربر را انتخاب کنید ...",
	error_fill_the_form: "آیتم ها به درستی وارد نشده اند",
	form_submitted_msg: "برنامه با موفقیت ثبت شد",
	user_without_voucher: "این کاربر اشتراک فعال ندارد، با این حال می‌توانید برنامه مدنظر خود را ثبت کنید.",
}

const CONSTANTS = {
	EMPTY_NOTES: Array.apply(null, Array(7)).map(_ => ""),
	EMPTY_VIDEOS: Array.apply(null, Array(7)).map(_ => ""),
}
const ACTION = {
	NONE: 0,
	SELECT_USER: 1,
	SELECT_FOOD: 2,
	PICK_FOOD_VALUE: 3,
	FORM_SUBMITTED: 4,
	SELECT_WORKOUT: 5,
	PICK_WORKOUT_VALUE: 6,
}

const GROUPS_DEFAULT = [
	{index: 1, label: "صبحانه"},
	{index: 2, label: "ناهار"},
	{index: 3, label: "شام"},
	{index: 4, label: "میان وعده"},
]

const PostDietProgramView = () => {

	const [action, setActionState] = useState({code: ACTION.NONE, data: null})
	const [user, setUser] = useState(undefined)
	const [groups, setGroups] = useState(GROUPS_DEFAULT)
	const [loading, setLoading] = useState(false)

	const toaster = useRef()
	const [toast, addToast] = useState(0)

	const [formData, setFormDataState] = useState({
		decreaseOrIncreaseCoefficient: 0,
		settingsCalorie: 0,
		settingsCarbs: 0,
		settingsProtein: 0,
		settingsFat: 0,
		items: [],
		workouts: [],
	})

	const [notes, setNotesState] = useState(CONSTANTS.EMPTY_NOTES)
	const [videos, setVideosState] = useState(CONSTANTS.EMPTY_VIDEOS)

	const setFormData = (data, save = false) => {
		setFormDataState(data)

		const isEmpty = data.decreaseOrIncreaseCoefficient === 0 && data.settingsCalorie === 0 &&
			data.settingsCarbs === 0 && data.settingsProtein === 0 &&
			data.settingsFat === 0 && data.items.length === 0

		if(user) {
			Local.dietProgramDraft.user.set(user)
		}

		if(save && !isEmpty)  {
			Local.dietProgramDraft.data.set(data)
		}
		Local.dietProgramDraft.notes.set(notes)
		Local.dietProgramDraft.videos.set(videos)
	}

	const setNotes = (val, save = false) => {
		setNotesState(val)
		if(save) {
			const isValid = val && val.length === CONSTANTS.EMPTY_NOTES.length
			Local.dietProgramDraft.notes.set(isValid ? val : CONSTANTS.EMPTY_NOTES)
		}
	}

	const setVideos = (val, save = false) => {
		setVideosState(val)
		if(save) {
			const isValid = val && val.length === CONSTANTS.EMPTY_VIDEOS.length
			Local.dietProgramDraft.videos.set(isValid ? val : CONSTANTS.EMPTY_VIDEOS)
		}
	}

	const loadDraft = () => {
		const data = Local.dietProgramDraft.data.get()
		const u = Local.dietProgramDraft.user.get()
		const n = Local.dietProgramDraft.notes.get()
		const v = Local.dietProgramDraft.videos.get()
		if(u) 		setUser(u)
		if(data) 	{
			setFormData(data)
			setNotes(n && n.length === CONSTANTS.EMPTY_NOTES.length ? n : CONSTANTS.EMPTY_NOTES)
			setVideos(v && v.length === CONSTANTS.EMPTY_VIDEOS.length ? v : CONSTANTS.EMPTY_VIDEOS)
		}
	}


	useEffect(() => {
		onDecreaseOrIncreaseCoefficientValueChange()
		return () => {}
	}, [user])

	const setAction = (code, data = null) => setActionState({code,data})

	const onDecreaseOrIncreaseCoefficientValueChange = (coefficient = undefined) => {
		if(coefficient === undefined)
			coefficient = formData.decreaseOrIncreaseCoefficient ?? 0
		coefficient = Math.max(-20, Math.min(20, coefficient))
		const cal = Math.round( (user ? user.bmrCalorie ?? 0 : 0) * (100 + coefficient) / 100.0 )
		onCalorieValueChanged(cal, coefficient)
	}

	const onCalorieValueChanged = (cal, coefficient = undefined) => {
		const c = coefficient === undefined ? (formData.decreaseOrIncreaseCoefficient ?? 0) : coefficient
		const proteinPercent = c > 0 ? 40 : c === 0 ? 37.5 : 35
		const carbsPercent = c > 0 ? 35 : c === 0 ? 37.5 : 40
		const fatPercent = 100 - (proteinPercent + carbsPercent)

		setFormData({
			...formData,
			settingsCalorie:  cal,
			decreaseOrIncreaseCoefficient: c,
			settingsProtein: Math.round ( (proteinPercent/100.0) * cal / 4 ),
			settingsCarbs: Math.round ( (carbsPercent/100.0) * cal / 4 ),
			settingsFat: Math.round ( (fatPercent/100.0) * cal / 9 ),
		}, true)
	}

	const onProteinRangeValueChanged = (protein) => {
		const carbs = Math.round( (formData.settingsCalorie - 4 * protein - 9 * formData.settingsFat) / 4 )
		setFormData({
			...formData,
			settingsProtein: protein,
			settingsCarbs: carbs,
		}, true)
	}

	const onCarbsRangeValueChanged = (carbs) => {
		const protein = Math.round( (formData.settingsCalorie - 4 * carbs - 9 * formData.settingsFat) / 4 )
		setFormData({
			...formData,
			settingsProtein: protein,
			settingsCarbs: carbs,
		}, true)
	}

	const onFatRangeValueChanged = (fat) => {
		const carbs = Math.round( (formData.settingsCalorie - 4 * formData.settingsProtein - 9 * fat) / 4 )
		setFormData({
			...formData,
			settingsCarbs: carbs,
			settingsFat: fat,
		}, true)
	}

	const pushErrorToast = (message) => {
		if(message && message.length > 0) {
			addToast(errorToastView(message))
		}
	}

	const handleAddFoodItem = (days, groupIndices, food, unit, value, info) => {
		const unitName = unit.nameFa ?? (unit.nameEn ?? "")
		const obj = {
			foodUnitId: unit.id,
			foodId: food.id,
			foodName: food.nameFa ?? (food.nameEn ?? ""),
			unitName: unitName,
			image: food.image ?? "",
			label: `${value} __ ${unitName}`,
			value: value,
			info: info,
		}
		let items = formData.items
		days.forEach(dayIndex => {
			groupIndices.forEach(gIndex => {
				const data = {
					dayIndex: dayIndex,
					gIndex: gIndex,
					gLabel: groups.find(x => x.index === gIndex).label ?? "",
					key: dayIndex * 100000 + gIndex * 10000 + unit.id,
					...obj }
				if(items.findIndex(e => e.dayIndex === dayIndex && e.gIndex === gIndex && (e.foodUnitId === data.foodUnitId)) < 0) {
					// insert
					items = items.concat(data)
						.sort((a,b) => (a.dayIndex*1000+a.gIndex) - (b.dayIndex*1000+b.gIndex) )
				} else {
					//replace
					items = items.map(e =>
						(e.dayIndex === dayIndex && e.gIndex === gIndex && (e.foodUnitId === data.foodUnitId)) ? data : e
					)
						.sort((a,b) => (a.dayIndex*1000+a.gIndex) - (b.dayIndex*1000+b.gIndex) )
				}
			})
		})
		setFormData({...formData, items:items}, true)
	}

	const handleAddWorkoutItem = (days, workout, value) => {
		const label = workout.type === 0 ? `مدت زمان ${value._duration} دقیقه` : `تعداد ${value._set} ست ${value._count} تایی`
		const obj = {
			workoutId: workout.id,
			workoutName: workout.nameFa,
			image: workout.image ?? "",
			label: label,
			value: value,
			value_duration: value._duration,
			value_set: value._set,
			value_count: value._count,
			value_note: value._note,
		}
		let items = formData.workouts
		days.forEach(dayIndex => {
				const data = {
					dayIndex: dayIndex,
					key: dayIndex * 100000 + workout.id,
					...obj }
				if(items.findIndex(e => e.dayIndex === dayIndex && (e.workoutId === data.workoutId)) < 0) {
					// insert
					items = items.concat(data)
						.sort((a,b) => (a.dayIndex) - (b.dayIndex) )
				} else {
					//replace
					items = items.map(e => (e.dayIndex === dayIndex && (e.workoutId === data.workoutId)) ? data : e)
						.sort((a,b) => (a.dayIndex) - (b.dayIndex) )
				}
		})
		setFormData({...formData, workouts:items}, true)
	}

	const handleEditNoteValue = (value, dayIndex) => {
		setNotes(
			notes.map((e, idx) => idx === dayIndex ? value : e),
			true
		)
	}

	const handleEditVideoValue = (value, dayIndex) => {
		setVideos(
			videos.map((e, idx) => idx === dayIndex ? value : e),
			true
		)
	}

	const handleDeleteFoodItem = (item) => {
		const items = formData.items.filter( ({dayIndex, gIndex, foodUnitId}) => ! (dayIndex === item.dayIndex && gIndex === item.gIndex && foodUnitId === item.foodUnitId) )
		setFormData({...formData, items:items})
	}

	const handleDeleteWorkoutItem = (item) => {
		const workouts = formData.workouts.filter( ({dayIndex, workoutId}) => ! (dayIndex === item.dayIndex && workoutId === item.workoutId) )
		setFormData({...formData, workouts:workouts})
	}

	const handleSubmitForm = () => {
		const isDataEmpty = !formData || (
			formData.decreaseOrIncreaseCoefficient === 0 && formData.settingsCalorie === 0 &&
			formData.settingsCarbs === 0 && formData.settingsProtein === 0 &&
			formData.settingsFat === 0 && formData.items.length === 0
		)

		if(!user) {
			pushErrorToast(MSG.choose_user)
		} else if(isDataEmpty) {
			pushErrorToast(MSG.error_fill_the_form)
		} else {
			setLoading(true)
			Axios.post("diet/program", {
				user_id: user.id,
				items: formData.items,
				workouts: formData.workouts,
				settingsCalorie: formData.settingsCalorie,
				settingsProtein: formData.settingsProtein,
				settingsCarbs: formData.settingsCarbs,
				settingsFat: formData.settingsFat,
				notes: notes,
				videos: videos,
			}).then(res => {
				setLoading(false)
				setAction(ACTION.FORM_SUBMITTED)
				console.log("Submitted")
			}).catch(err => {
				setLoading(false)
				try {
					pushErrorToast(err.response.data.errorMessage ?? "")
				} catch (e){}
			})
		}
	}

	const errorToastView = (message, title = "Error") => ( message && message.length > 0) ? (
		<CToast title={title}>
			<CToastHeader closeButton>
				<CIcon icon={cilWarning} className="text-danger"/>
				<strong className="me-auto text-danger">{title}</strong>
			</CToastHeader>
			<CToastBody>{message ?? ""}</CToastBody>
		</CToast>
	) : null

	const successView = <CCard color="info">
		<CCardBody className="text-light">
			<CRow xs={{cols:'auto'}} className="justify-content-start align-items-center">
				<CCol>
					<CIcon icon={cilCheckCircle} className="text-white" size={"xl"}/>
				</CCol>
				<CCol>
					<span className="mx-2 text-white">{MSG.form_submitted_msg}</span>
				</CCol>
			</CRow>
		</CCardBody>
		<CCardFooter>
			<CRow xs={{cols:'auto'}} className="justify-content-end">
				<CCol>
					<CButton className="align-self-end" color="light" onClick={() => setAction(ACTION.NONE)}>ثبت برنامه جدید</CButton>
				</CCol>
			</CRow>
		</CCardFooter>
	</CCard>

	const userSelectionView = user ? (
		<CRow xs={{cols:'auto'}} className="align-items-center justify-content-between">
			<CCol>
				<CRow xs={{cols:'auto'}} className="align-items-center justify-content-center">
					<CCol>
						<CAvatar src={user.avatar ?? ""} color={"secondary"}>{user.name.substring(0, 1) ?? ""}</CAvatar>
					</CCol>
					<CCol>
						<CCardText className="m-0">{user.name ?? ""}</CCardText>
						<CCardText className="m-0 extra-small text-secondary">{user.mobile && user.mobile.length > 0 ? (user.mobile ?? "") : (user.email ?? "")}</CCardText>
					</CCol>
				</CRow>
			</CCol>
			<CCol className="p-0">
				<CTooltip content={"تغییر کاربر"} >
					<CIcon icon={cilX} onClick={() => setUser(undefined)}/>
				</CTooltip>
			</CCol>
		</CRow>
	) : (
		<CAlert color="danger" variant="solid" className="d-flex align-items-center"
				onClick={() => setAction(ACTION.SELECT_USER)}>
			<CIcon icon={cilWarning} className="flex-shrink-0 me-2" width={24} height={24} />
			<span className="text-decoration-underline">{MSG.choose_user}</span>
		</CAlert>
	)


	const userInfoView = !user ? null : (
		<CRow className="mb-3" xs={{gutter: 20}}>
			<CCol xs={12} sm={6} xl={6} className="my-1">
				<CCard className="h-100 ">
					<CCardHeader>
						اطلاعات کاربر
					</CCardHeader>
					<CCardBody>
						<CTable striped >
							<CTableBody>
								{
									[
										{l:"سن", v: user.age || 0, u: "سال" },
										{l:"قد", v: user.height || 0, u: "سانتی‌متر" },
										{l:"وزن", v: user.weight || 0, u: "کیلوگرم" },
										{l:"جنسیت", v: user.gender === 1 ? "مرد" : "زن"|| 0, u: "" },
										{l:"سطح فعالیت", v: user.activityLevelStr || "", u: "" },
									].map(( e, idx ) => (
										<CTableRow key={idx+1}>
											<CTableHeaderCell>{e.l}</CTableHeaderCell>
											<CTableHeaderCell className="">
												{e.v} <span className="extra-small text-secondary">{e.u}</span>
											</CTableHeaderCell>
										</CTableRow>
									))
								}
							</CTableBody>
						</CTable>
					</CCardBody>
				</CCard>
			</CCol>
			<CCol xs={12} sm={6} xl={6} className="my-1">
				<CCard className="h-100">
					<CCardHeader>
						تنظیمات کاربر
					</CCardHeader>
					<CCardBody>
						<CTable striped >
							<CTableBody>
								{
									[
										{l:"BMI", v: user.bmi || 0, u: "" },
										{l:"BMR", v: user.bmr || 0, u: "" },
										{l:"کالری", v: user.bmrCalorie ?? "-", u: "", c:"text-danger" },
									].map(( e, idx ) => (
										<CTableRow key={idx+1}>
											<CTableHeaderCell>{e.l}</CTableHeaderCell>
											<CTableHeaderCell className={e.c ?? ""}>
												{e.v} <span className="extra-small text-secondary">{e.u}</span>
											</CTableHeaderCell>
										</CTableRow>
									))
								}
							</CTableBody>
						</CTable>
					</CCardBody>
				</CCard>
			</CCol>
		</CRow>
	)

	const calorieSettingsView = !user ? null : (
		<CAccordionItem className="mb-3" itemKey={2}>
			<CAccordionHeader>
				<CRow xs={{cols:'auto'}} className="w-100 justify-content-start align-items-center">
					<CCol>
						تنظیمات کالری شما
					</CCol>
					<span><CIcon icon={cilAperture} /></span>
					<CCol>
					</CCol>
					<CCol className="text-dark">
						<span>ضریب کاهش یا افزایش:
								<span className="text-dark mx-2">{formData.decreaseOrIncreaseCoefficient} </span>
						</span>
						<span className="mx-3">|</span>
						<span>کالری نهایی:
								<span className="text-dark mx-2">{formData.settingsCalorie} </span>
						</span>
					</CCol>
				</CRow>
			</CAccordionHeader>
			<CAccordionBody>
				<CRow>
					<CCol xs={12} lg={6} className="pt-2 pt-xl-0">
						<CContainer>
							<CFormLabel htmlFor="inputDecreaseOrIncreaseCoefficient">ضریب کاهش یا افزایش:
								<span className={formData.decreaseOrIncreaseCoefficient >= 0 ? "text-primary" : "text-danger"}> {formData.decreaseOrIncreaseCoefficient} </span>
							</CFormLabel>
							<CFormRange steps={1} min={-20} max={20} id="inputDecreaseOrIncreaseCoefficient"
										className="dir-ltr"
										value={formData.decreaseOrIncreaseCoefficient}
										onChange={e => onDecreaseOrIncreaseCoefficientValueChange(parseInt(e.target.value))}
							/>
							<CFormLabel htmlFor="inputCalorie">کالری :</CFormLabel>
							<CFormInput id="inputCalorie" type="number"
										className="dir-ltr"
										value={formData.settingsCalorie}
										onChange={e => onCalorieValueChanged(parseInt(e.target.value))}
							/>
						</CContainer>
					</CCol>
					<CCol xs={12} lg={6} className="pt-2 pt-xl-0">
						<CContainer>
							<CFormLabel htmlFor="inputRangeCalorie">کالری نهایی:
								<span className="text-dark mx-2">{formData.settingsCalorie} </span>
							</CFormLabel>
							<CFormRange steps={1} min={0} max={5000} id="inputRangeCalorie"
										className="dir-ltr"
										value={formData.settingsCalorie}
										onChange={e => onCalorieValueChanged(parseInt(e.target.value))}
							/>

							<CFormLabel htmlFor="inputRangeProtein">پروتئین نهایی:
								<span className="text-primary mx-2">{formData.settingsProtein} </span>
							</CFormLabel>
							<CFormRange steps={1} min={0} max={506} id="inputRangeProtein"
										className="dir-ltr"
										value={formData.settingsProtein}
										onChange={e => onProteinRangeValueChanged(parseInt(e.target.value))}
							/>

							<CFormLabel htmlFor="inputRangeCarbs">کربوهیدارت نهایی:
								<span className="text-danger mx-2">{formData.settingsCarbs} </span>
							</CFormLabel>
							<CFormRange steps={1} min={0} max={506} id="inputRangeCarbs"
										className="dir-ltr"
										value={formData.settingsCarbs}
										onChange={e => onCarbsRangeValueChanged(parseInt(e.target.value))}
							/>

							<CFormLabel htmlFor="inputRangeFat">چربی نهایی:
								<span className="text-warning mx-2">{formData.settingsFat} </span>
							</CFormLabel>
							<CFormRange steps={1} min={0} max={225} id="inputRangeFat"
										className="dir-ltr"
										value={formData.settingsFat}
										onChange={e => onFatRangeValueChanged(parseInt(e.target.value))}
							/>
						</CContainer>

					</CCol>
				</CRow>
			</CAccordionBody>
		</CAccordionItem>
	)

	const programView1 = <CAccordionItem>
		<CAccordionHeader className="mb-3">برنامه تغذیه</CAccordionHeader>
		<CAccordionBody>
			<CButton variant="outline" className="m-2" color={"primary"} onClick={() => setAction(ACTION.SELECT_FOOD)}>
				افزودن غذا <CIcon icon={cilPlus} className="text-primary" size={"sm"}/>
			</CButton>
			<CButton variant="outline" className="m-2" color={"warning"} onClick={loadDraft}>
				پیش‌نویس<CIcon icon={cilPen} className="text-warning" size={"sm"}/>
			</CButton>
			<DietItemsWeekdaysView className="my-2 w-100"
								   dailyParams={{
									   calorie: formData.settingsCalorie ?? 100,
									   protein: formData.settingsProtein ?? 100,
									   carbs: formData.settingsCarbs ?? 100,
									   fat: formData.settingsFat ?? 100,
								   }}
								   items={formData.items}
								   notes={notes}
								   videos={videos}
								   onItemDeleteHandler={handleDeleteFoodItem}
								   onNoteSubmittedHandler={handleEditNoteValue}
								   onVideoSubmittedHandler={handleEditVideoValue}
			/>
		</CAccordionBody>
	</CAccordionItem>

	const programView2 = <CAccordionItem>
		<CAccordionHeader className="mt-3">برنامه ورزشی</CAccordionHeader>
		<CAccordionBody>
			<CButton variant="outline" className="m-2" color={"primary"} onClick={() => setAction(ACTION.SELECT_WORKOUT)}>
				افزودن فعالیت <CIcon icon={cilPlus} className="text-primary" size={"sm"}/>
			</CButton>
			<WorkoutItemsWeekdaysView className="my-2 w-100"
								   items={formData.workouts}
								   notes={notes}
								   onItemDeleteHandler={handleDeleteWorkoutItem}
								   onNoteSubmittedHandler={() => {}}
			/>
		</CAccordionBody>
	</CAccordionItem>

	return (action.code === ACTION.FORM_SUBMITTED) ? successView : (
		<CContainer>

			{!user && userSelectionView }

			{user && !user.hasDietVoucher ? (
				<CAlert color={"warning"}>
					{MSG.user_without_voucher}
				</CAlert>
			) : null}

			<CAccordion flush alwaysOpen={true} activeItemKey={1}>

				{!user ? null : (
					<CAccordionItem itemKey={1} className="mb-3">
						<CAccordionHeader>{userSelectionView}</CAccordionHeader>
						<CAccordionBody>{userInfoView}</CAccordionBody>
					</CAccordionItem>
				)}

				{calorieSettingsView}

				{programView1}
				{programView2}

			</CAccordion>


			<CRow xs={{cols:'auto'}} className="my-5 justify-content-end align-items-center">
				<CCol>
					<CLoadingButton color="primary py-2 px-5" loading={loading} onClick={handleSubmitForm}>ارسال برنامه</CLoadingButton>
				</CCol>
			</CRow>

			<SelectUserModal
				visible={action.code === ACTION.SELECT_USER}
				onClose={() => setAction(ACTION.NONE)}
				onItemSelected={item => {
					setUser(item)
					setAction(ACTION.NONE)
				}}
			/>

			<SelectFoodModal
				visible={action.code === ACTION.SELECT_FOOD}
				onClose={() => {
					setActionState({
						...action,
						code: (action.code === ACTION.SELECT_FOOD ? ACTION.NONE : ACTION.PICK_FOOD_VALUE),
					})
				}}
				onItemSelected={food => setAction(food ? ACTION.PICK_FOOD_VALUE : ACTION.NONE, food)}
			/>

			<SelectWorkoutModal
				visible={action.code === ACTION.SELECT_WORKOUT}
				onClose={() => {
					setActionState({
						...action,
						code: (action.code === ACTION.SELECT_WORKOUT ? ACTION.NONE : ACTION.PICK_WORKOUT_VALUE),
					})
				}}
				onItemSelected={workout => setAction( workout? ACTION.PICK_WORKOUT_VALUE : ACTION.NONE, workout)}
			/>

			<FoodValuePickerModal
				food={action.data}
				groups={groups}
				visible={action.code === ACTION.PICK_FOOD_VALUE && !!action.data}
				onClose={() => {
					setAction(ACTION.NONE, null)
				}}
				onItemSelected={(days, groupIndices, food, unit, value, info) => {
					if(days.length > 0 && groupIndices.length > 0 && food && unit && value > 0) {
						handleAddFoodItem(days, groupIndices, food, unit, value, info)
					}
					setAction(ACTION.NONE, null)
				}}
			/>


			<WorkoutValuePickerModal
				workout={action.data}
				visible={action.code === ACTION.PICK_WORKOUT_VALUE && !!action.data}
				onClose={() => {
					setAction(ACTION.NONE, null)
				}}
				onItemSelected={(days, workout, value) => {
					if(days.length > 0 &&  workout && value) {
						handleAddWorkoutItem(days, workout, value)
					}
					setAction(ACTION.NONE, null)
				}}
			/>

			<CToaster ref={toaster} push={toast} placement="top-start" />

		</CContainer>
	)
}

export default PostDietProgramView
