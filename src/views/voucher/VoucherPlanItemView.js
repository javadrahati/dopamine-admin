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



const VoucherPlanItemView = ({ item, onItemEditHandler, onItemDeleteHandler, ...restProps }) => {

	return (
		<CCol className="p-1" lg={6} md={12} {...restProps}>
			<CCard className="h-100">
				<CCardHeader>
					<CCardText className="m-1 text-truncate"><strong>{item.titleFa ?? ""}</strong></CCardText>
					<CCardText className="m-1 small text-truncate" >{item.titleEn ?? ""}</CCardText>
					<CRow className="mt-1 justify-content-between">
						<CCol>
							<CCardText className="text-primary"><strong>{item.priceStr ?? ""}</strong></CCardText>
						</CCol>
						<CCol>
							<CCardText className="text-dark text-end">{`${item.days ?? 30} روز`}</CCardText>
						</CCol>
					</CRow>
					<CRow className="mt-1 justify-content-between align-items-center">
						<CCol>
							<CBadge size={"sm"} className={"p-2"} color={item.type === 0 ? "primary" : "danger"}>{item.typeStr ?? ""}</CBadge>
						</CCol>
						{item.trainer && (
							<CCol>
								<CRow xs={{cols:'auto'}} className="align-items-center justify-content-end">
									<CCol className="p-0"><CAvatar size={"xs"} src={item.trainer.avatar ?? ""} /></CCol>
									<CCol className="small">{item.trainer.nameFa ?? ""}</CCol>
								</CRow>
							</CCol>
						)}
					</CRow>
					<CRow className="justify-content-start mt-2" xs={{cols:'auto'}}>
						<CCol>
							<CTooltip content="حذف"><CIcon icon={cilTrash}  onClick={() => onItemDeleteHandler(item)} /></CTooltip>
						</CCol>
						<CCol>
							<CTooltip content="ویرایش"><CIcon icon={cilPencil}  onClick={() => onItemEditHandler(item)} /></CTooltip>
						</CCol>
					</CRow>
				</CCardHeader>
				<CCardBody className="p-0">
					<CAccordion flush alwaysOpen>
						<CAccordionItem itemKey={40} >
							<CAccordionHeader >توضیحات فارسی</CAccordionHeader>
							<CAccordionBody className="small">
								{item.descriptionFa ?? ""}
							</CAccordionBody>
						</CAccordionItem>
						<CAccordionItem itemKey={50} >
							<CAccordionHeader >توضیحات انگلیسی</CAccordionHeader>
							<CAccordionBody className="small text-end text-body">
								{item.descriptionEn ?? ""}
							</CAccordionBody>
						</CAccordionItem>
					</CAccordion>
				</CCardBody>
			</CCard>
		</CCol>
	)
}

export default VoucherPlanItemView
