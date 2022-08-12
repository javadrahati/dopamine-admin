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
import {cilDelete, cilPen, cilWarning, cilX, cilXCircle} from "@coreui/icons";
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

const WorkoutItemsWeekdaysView = ({
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

	return (
		<div {...restProps}>
			<CNav variant="tabs"  >
				{MSG.weekdays.map((weekdayStr, index) => {
					return (
						<CNavItem key={index}>
							<CNavLink
								active={activeTabIndex === index}
								onClick={() => setActiveTabIndex(index)}>
								<span className="extra-small">{weekdayStr}</span>
							</CNavLink>
						</CNavItem>
					)})}
			</CNav>

			<CContainer>
				<div className="m-2">
					{items.filter(e => e.dayIndex === activeTabIndex).map(e =>
						<CCallout key={e.key} color={"primary"}>
							<CRow xs={{cols:'auto'}} className="align-items-center justify-content-between">
								<CCol>
									<CRow xs={{cols: 'auto'}} className="align-items-center">
										<CCol>
											<CImage src={e.image} align="center" height={40} rounded className="bg-secondary"/>
										</CCol>
										<CCol>
											<CCardText className="m-0">{e.workoutName}</CCardText>
											<CCardText className="small m-0 text-dark">
												<span className="mx-4 text-primary"> {e.label ?? ""} </span>
											</CCardText>
											{ e.value._note.length > 0 &&
												<CCardText className="small mx-4 text-dark">
													<CIcon icon={cilWarning} size={"sm"} />
													<span className="text-secondary small"> {e.value._note ?? ""} </span>
												</CCardText>
											}
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

export default WorkoutItemsWeekdaysView
