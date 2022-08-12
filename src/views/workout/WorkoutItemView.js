import React from "react";
import {
	CAccordion, CAccordionBody, CAccordionHeader, CAccordionItem,
	CBadge,
	CButton,
	CButtonGroup,
	CCard,
	CCardBody,
	CCardFooter, CCardHeader,
	CCardImage,
	CCardText,
	CCardTitle, CCol, CContainer, CImage, CProgress, CProgressBar, CRow, CTooltip
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {cilAudio, cilColorFill, cilNoteAdd, cilPen, cilPencil, cilTrash, cilVideo} from "@coreui/icons";
import AudioPlayer from "../../helpers/Components/AudioPlayer";
import ReactPlayer from "react-player/lazy";



const WorkoutItemView = ({ item, onItemEditHandler, onItemDeleteHandler, ...restProps }) => {

	return (
		<CCol className="p-1" xl={4} lg={6} md={12} {...restProps}>
			<CCard className="h-100">
				<CCardHeader>
					<CRow xs={{gutter: 10}}>
						<CCol xs={4}>
							<CImage height={120} src={item.image || ""} thumbnail/>
						</CCol>
						<CCol xs={8}>
							<CCardText className="m-1 text-truncate"><strong>{item.nameFa ?? ""}</strong></CCardText>
							<CCardText className="m-1 small text-truncate" >
								{ item.type === 1 &&
									<CBadge color={"info"} textColor={"white"} className="small me-1">GYM</CBadge>
								}
								{item.nameEn ?? ""}
							</CCardText>
							<CRow className="justify-content-start mt-1" xs={{cols:'auto'}}>
								<CCol>
									<CTooltip content="حذف"><CIcon icon={cilTrash}  onClick={() => onItemDeleteHandler(item)} /></CTooltip>
								</CCol>
								<CCol>
									<CTooltip content="ویرایش"><CIcon icon={cilPencil}  onClick={() => onItemEditHandler(item)} /></CTooltip>
								</CCol>
							</CRow>
						</CCol>
					</CRow>
				</CCardHeader>
				<CCardBody className="p-0">
					<CAccordion flush alwaysOpen>
						<CAccordionItem itemKey={9}>
							<CAccordionHeader >ویدئو</CAccordionHeader>
							<CAccordionBody className="small text-end">
								{item.hasVideo && (
									<ReactPlayer width={'100%'} url={item.video} controls/>
								)}
							</CAccordionBody>
						</CAccordionItem>
						<CAccordionItem itemKey={20} >
							<CAccordionHeader >یادداشت فارسی</CAccordionHeader>
							<CAccordionBody className="small">
								{item.noteFa ?? ""}
							</CAccordionBody>
						</CAccordionItem>
						<CAccordionItem itemKey={30} >
							<CAccordionHeader>یادداشت انگلیسی</CAccordionHeader>
							<CAccordionBody className="small text-end">
								{item.noteEn ?? ""}
							</CAccordionBody>
						</CAccordionItem>
						<CAccordionItem itemKey={40} >
							<CAccordionHeader >توضیحات فارسی</CAccordionHeader>
							<CAccordionBody className="small">
								{item.introductionFa ?? ""}
							</CAccordionBody>
						</CAccordionItem>
						<CAccordionItem itemKey={50} >
							<CAccordionHeader >توضیحات انگلیسی</CAccordionHeader>
							<CAccordionBody className="small text-end text-body">
								{item.introductionEn ?? ""}
							</CAccordionBody>
						</CAccordionItem>
					</CAccordion>
				</CCardBody>
			</CCard>
		</CCol>
	)
}

export default WorkoutItemView
