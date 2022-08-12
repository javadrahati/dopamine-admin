import React, {useEffect, useState} from "react";
import {
	CCallout,
	CCard, CCardHeader,
	CCardText,
	CCol,
	CContainer, CFormLabel,
	CHeaderDivider,
	CImage,
	CListGroup,
	CListGroupItem,
	CNav,
	CNavItem,
	CNavLink, CProgress, CProgressBar,
	CRow,
	CTabContent,
	CTabPane, CTooltip
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {cilDelete, cilPen, cilX, cilXCircle} from "@coreui/icons";
import VideoUpload from "../../helpers/Components/VideoUpload";
import EditNoteModal from "./EditNoteModal";
import DeleteItemModal from "../modal/DeleteItemModal";

const MSG = {
	weekdays: [
		"شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه"
	],
	empty_note_msg: "بدون یادداشت",
}


function groupBy(items) {
	return items.reduce((acc, curr) => {
		if (curr.gLabel) {
			const {gLabel} = curr
			const currentItems = acc[gLabel];

			return {
				...acc,
				[gLabel]: currentItems ? [...currentItems, curr] : [curr]
			};
		}
		return acc;
	}, {});
}

const DietItemsWeekdaysView = ({
								   items = [],
								   notes = ["","","","","","",""],
								   videos = [null,null,null,null,null,null, null],
								   onItemDeleteHandler = item => {console.log("ItemDelete", item)},
								   dailyParams = {},
								   onNoteSubmittedHandler = null,
								   onVideoSubmittedHandler = null,
								   ...restProps
							   }) => {

	const [activeTabIndex, setActiveTabIndex] = useState(0)
	const [itemToDelete, setItemToDelete] = useState(undefined)
	const [infos, setInfos] = useState(MSG.weekdays.map(e => ({
		calorie:0, calorieProgress:0, protein:0, proteinProgress:0, fat:0, fatProgress:0, carbs:0, carbsProgress:0,
	})))

	const [noteToEditIndex, setNoteToEditIndex] = useState(undefined)

	useEffect(() => {
		calcInfos()
		return ()=>{}
	}, [dailyParams, items])

	const calcInfos = () => {
		const inf = MSG.weekdays.map((weekdayStr, dayIndex) => {
			const calorie = items.filter(e=>e.dayIndex === dayIndex).reduce((sum, e) => sum + (e.info.calorie ?? 0), 0)
			const protein = items.filter(e=>e.dayIndex === dayIndex).reduce((sum, e) => sum + (e.info.protein ?? 0), 0)
			const carbs = items.filter(e=>e.dayIndex === dayIndex).reduce((sum, e) => sum + (e.info.carbs ?? 0), 0)
			const fat = items.filter(e=>e.dayIndex === dayIndex).reduce((sum, e) => sum + (e.info.fat ?? 0), 0)
			const calorieProgress = dailyParams.calorie <= 0 ? 0 : Math.round( calorie * 100 / dailyParams.calorie )
			const proteinProgress = dailyParams.protein <= 0 ? 0 : Math.round( protein * 100 / dailyParams.protein )
			const carbsProgress = dailyParams.carbs <= 0 ? 0 : Math.round( carbs * 100 / dailyParams.carbs )
			const fatProgress = dailyParams.fat <= 0 ? 0 : Math.round( fat * 100 / dailyParams.fat )
			return {
				calorie, calorieProgress,
				protein, proteinProgress,
				fat, fatProgress,
				carbs, carbsProgress,
			}
		})
		setInfos(inf)
	}

	const getNote = dayIndex => {
		if(notes && notes.length >= dayIndex ) {
			const msg = notes[dayIndex] ?? ""
			if(msg && msg.length > 0) {
				return msg
			}
		}
		return MSG.empty_note_msg
	}

	const handleEditNote = () => setNoteToEditIndex(activeTabIndex)

	const handleNoteValueSubmitted = value => {
		if(onNoteSubmittedHandler) {
			onNoteSubmittedHandler(value, activeTabIndex)
		}
		setNoteToEditIndex(undefined)
	}

	const handleVideoUrlUploaded = url => {
		if(onVideoSubmittedHandler) {
			onVideoSubmittedHandler(url, activeTabIndex)
		}
	}

	return (
		<div {...restProps}>
			<CNav variant="tabs"  >
				{MSG.weekdays.map((weekdayStr, index) => {
					const progress = infos[index].calorieProgress ?? 0
					const progressColor = progress < 30 ? "danger" : progress < 50 ? "warning" : progress < 75 ? "primary" : "success"
					return (
						<CNavItem key={index}>
							<CNavLink
								active={activeTabIndex === index}
								onClick={() => setActiveTabIndex(index)}>
								<CProgress height={4}>
									<CProgressBar value={progress} color={progressColor}/>
								</CProgress>
								<span className="extra-small">{weekdayStr}</span>
							</CNavLink>
						</CNavItem>
					)})}
			</CNav>

			<CContainer>
				<div className="m-2">

					<div className={"m-4"}>
						{
							[
								{l : "کالری", c: "success", p: infos[activeTabIndex].calorieProgress ?? 0, v:infos[activeTabIndex].calorie ??0, exp: dailyParams.calorie},
								{l : "پروتئین", c: "primary", p: infos[activeTabIndex].proteinProgress ?? 0, v:infos[activeTabIndex].protein ??0, exp: dailyParams.protein},
								{l : "کربوهیدارت", c: "danger", p: infos[activeTabIndex].carbsProgress ?? 0, v:infos[activeTabIndex].carbs ??0, exp: dailyParams.carbs},
								{l : "چربی", c: "warning", p: infos[activeTabIndex].fatProgress ?? 0, v:infos[activeTabIndex].fat ??0, exp: dailyParams.fat}
							].map((e,idx) => <CRow key={idx+1}>
									<CCol xs={3}>
										<CRow xs={{cols:'auto'}} className="justify-content-between">
											<CCol className="small">{e.l}</CCol>
										</CRow>
									</CCol>
									<CCol xs={9}>
										<CProgress >
											<CProgressBar color={e.c} value={e.p}>
												{e.v.toFixed(0)}
											</CProgressBar>
											<CProgressBar color="light" value={100 - e.p} className="text-dark">
												{e.v >= e.exp ? "" : (e.exp - e.v).toFixed(0)}
											</CProgressBar>
										</CProgress>
									</CCol>
								</CRow>
							)}
					</div>

					<CRow className="justify-content-between align-items-stretch my-2">
						<CCol xs={12} lg={6}>
							<CCallout color={"dark"} className="h-100 m-0">
								<CRow xs={{cols:'auto'}} className="justify-content-between align-items-center">
									<CCol>یادداشت ارسالی برای کاربر</CCol>
									<CCol>
										<CTooltip content={"ویرایش"}>
											<CIcon icon={cilPen} onClick={handleEditNote}/>
										</CTooltip>
									</CCol>
								</CRow>
								<CContainer className="m-1 p-2 text-black-50">
									{getNote(activeTabIndex)}
								</CContainer>
							</CCallout>
						</CCol>
						<CCol xs={12} lg={6}>
							<VideoUpload className="h-100 m-0" calloutClassName="m-0" onFileUploaded={handleVideoUrlUploaded} previewUrl={videos[activeTabIndex] ?? null}/>
						</CCol>
					</CRow>

					{items.filter(e => e.dayIndex === activeTabIndex).map(e =>
						<CCallout key={e.key} color={"primary"}>
							<CRow xs={{cols:'auto'}} className="align-items-center justify-content-between">
								<CCol>
									<CRow xs={{cols: 'auto'}} className="align-items-center">
										<CCol>
											<CImage src={e.image} align="center" height={40} rounded className="bg-secondary"/>
										</CCol>
										<CCol>
											<CCardText className="m-0">{e.foodName}</CCardText>
											<CCardText className="small m-0 text-dark">
												<span className="text-danger">{e.gLabel ?? ""} </span>
												<span className="mx-4 text-secondary"> {e.label ?? ""} </span>
											</CCardText>
										</CCol>
									</CRow>
								</CCol>
								<CCol>
									<CTooltip content="حذف آیتم">
										<CIcon icon={cilXCircle} size="lg" onClick={() => setItemToDelete(e)}/>
									</CTooltip>
								</CCol>
							</CRow>
						</CCallout>
					)}
				</div>
			</CContainer>

			<EditNoteModal
				visible={noteToEditIndex !== undefined}
				initialValue={notes[noteToEditIndex] ?? ""}
				onClose={() => setNoteToEditIndex(undefined)}
				onValueSubmitted={handleNoteValueSubmitted}
			/>

			<DeleteItemModal
				visible={itemToDelete !== undefined}
				onClose={() => setItemToDelete(undefined)}
				item={itemToDelete}
				onDeleteResponse={item => {
					console.log("onDeleteResponse, ", item)
					onItemDeleteHandler(item)
					setItemToDelete(undefined)
				}}
			/>

		</div>
	)
}

export default DietItemsWeekdaysView
