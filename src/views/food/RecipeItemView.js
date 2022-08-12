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
	CCardTitle, CCol, CImage, CProgress, CProgressBar, CRow, CTooltip
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {cilNoteAdd, cilPen, cilPencil, cilTrash} from "@coreui/icons";
import ReactPlayer from "react-player/lazy";



const RecipeItemView = ({ item, onItemEditHandler, onItemDeleteHandler, onUnitDeleteHandler, onUnitEditHandler, ...restProps }) => {

	return (
		<CCol className="p-1" lg={6} md={12} {...restProps} >
			<CCard className="h-100">
				<CCardHeader>
					<CRow xs={{gutter: 10}}>
						<CCol xs={4}>
							<CImage height={120} src={item.image || ""} thumbnail/>
						</CCol>
						<CCol xs={8}>
							<CCardText className="m-1 text-truncate"><strong>{item.food.nameFa || ""}</strong></CCardText>
							<CCardText className="m-1 text-truncate">{item.food.nameEn || ""}</CCardText>
							{/*<CCardText className="small m-1 text-truncate">{item.food.calorieTextFa || ""}</CCardText>*/}
							<CRow xs={{cols:'auto'}}>
								{item.food.categories && item.food.categories.map(cat => (
									<CBadge className="m-1 px-2 py-1" size={"md"} color={"light"} textColor={"secondary"}>{cat.nameFa}</CBadge>
								))}
							</CRow>
							<CRow className="justify-content-start" xs={{cols:'auto'}}>
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
						<CAccordionItem itemKey={20} >
							<CAccordionHeader >متن فارسی</CAccordionHeader>
							<CAccordionBody className="small">
								{item.textFa ?? ""}
							</CAccordionBody>
						</CAccordionItem>
						<CAccordionItem itemKey={30} >
							<CAccordionHeader>متن انگلیسی</CAccordionHeader>
							<CAccordionBody className="small text-end">
								{item.textEn ?? ""}
							</CAccordionBody>
						</CAccordionItem>
					</CAccordion>
				</CCardBody>
			</CCard>
		</CCol>
	)
}

export default RecipeItemView
