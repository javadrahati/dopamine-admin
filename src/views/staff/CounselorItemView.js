import React from "react";
import {
	CAccordion, CAccordionBody, CAccordionHeader, CAccordionItem, CAvatar,
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



const TrainerItemView = ({ item, onItemEditHandler, onItemDeleteHandler, ...restProps }) => {

	return (
		<CCol className="p-1" xl={4} lg={6} md={12} {...restProps} >
			<CCard className="h-100">
				<CCardHeader>
					<CRow xs={{gutter: 10, cols: 'auto'}}>
						<CCol>
							<CAvatar size={"xl"} src={item.avatar || ""} color={"secondary"}>{item.nameEn.substring(0, 1) ?? ""}</CAvatar>
						</CCol>
						<CCol>
							<CCardText className="m-1"><strong>{item.nameFa ?? ""}</strong></CCardText>
							<CCardText className="m-1 small" >{item.nameEn ?? ""}</CCardText>
							<CCardText className="m-1 small text-primary">{item.priceStrFa ?? ""}</CCardText>
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
						<CAccordionItem itemKey={10} >
							<CAccordionHeader>بیو</CAccordionHeader>
							<CAccordionBody className="small">
								<div>{item.bioFa ?? ""}</div>
								<div className="small text-medium-emphasis">
									<span>{item.bioEn ?? ""}</span>
								</div>
							</CAccordionBody>
						</CAccordionItem>
						<CAccordionItem itemKey={20} >
							<CAccordionHeader >اینترو فارسی</CAccordionHeader>
							<CAccordionBody className="small">
								{item.introFa ?? ""}
							</CAccordionBody>
						</CAccordionItem>
						<CAccordionItem itemKey={30} >
							<CAccordionHeader>اینترو انگلیسی</CAccordionHeader>
							<CAccordionBody className="small text-end">
								{item.introEn ?? ""}
							</CAccordionBody>
						</CAccordionItem>
					</CAccordion>
				</CCardBody>
			</CCard>
		</CCol>
	)
}

export default TrainerItemView
