import React from "react";
import {
	CBadge,
	CButton,
	CButtonGroup,
	CCard,
	CCardBody,
	CCardFooter,
	CCardImage,
	CCardText,
	CCardTitle, CCol, CRow, CTooltip
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {cilPen, cilPencil, cilTrash} from "@coreui/icons";



const FoodCategoryItemView = ({ item, onItemEditHandler, onItemDeleteHandler , ...restProps }) => {

	return (
		<CCol className="p-1" md={4} xs={6} lg={2} {...restProps} >
			<CCard className="h-100">
				<CCardImage src={item.image || ""} height={120} />
				<CCardBody>
					<CCardText className="small m-1">{item.nameFa || ""}</CCardText>
					<CCardText className="small m-1">
						{item.nameEn || ""}
					</CCardText>
					<CBadge color={"light"} textColor={"dark"} className={"m-1"} >{item.foods_count || 0}</CBadge>
				</CCardBody>
				<CCardFooter>
					<CRow className="justify-content-between" xs={{cols:'auto'}}>
						<CCol>
							<CTooltip content="حذف"><CIcon icon={cilTrash}  onClick={() => onItemDeleteHandler(item)} /></CTooltip>
						</CCol>
						<CCol>
							<CTooltip content="ویرایش"><CIcon icon={cilPencil}  onClick={() => onItemEditHandler(item)} /></CTooltip>
						</CCol>
					</CRow>
				</CCardFooter>
			</CCard>
		</CCol>
	)
}

export default FoodCategoryItemView
