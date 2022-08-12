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



const FoodItemView = ({ item, onItemEditHandler, onItemDeleteHandler, onUnitDeleteHandler, onUnitEditHandler, ...restProps }) => {

	return (
		<CCol className="p-1" lg={6} md={12} {...restProps} >
			<CCard className="h-100">
				<CCardHeader>
					<CRow xs={{gutter: 10}}>
						<CCol xs={4}>
							<CImage height={120} src={item.image || ""} thumbnail/>
						</CCol>
						<CCol xs={8}>
							<CCardText className="m-1 text-truncate"><strong>{`${item.nameFa} | ${item.nameEn}`}</strong></CCardText>
							<CCardText className="small m-1 text-truncate">{item.calorieTextFa || ""}</CCardText>
							<CRow xs={{cols:'auto'}}>
								{item.categories.map(cat => (
									<CBadge key={cat.id} className="m-1 px-2 py-1" size={"md"} color={"light"} textColor={"secondary"}>{cat.nameFa}</CBadge>
								))}
							</CRow>
							<CRow className="justify-content-start" xs={{cols:'auto'}}>
								<CCol>
									<CTooltip content="حذف"><CIcon icon={cilTrash}  onClick={() => onItemDeleteHandler(item)} /></CTooltip>
								</CCol>
								<CCol>
									<CTooltip content="ویرایش"><CIcon icon={cilPencil}  onClick={() => onItemEditHandler(item)} /></CTooltip>
								</CCol>
								<CCol>
									<CTooltip content="افزودن واحد غذایی"><CIcon icon={cilNoteAdd}  onClick={() => onUnitEditHandler({food_id: item.id})} /></CTooltip>
								</CCol>
							</CRow>
						</CCol>
					</CRow>
				</CCardHeader>
				<CCardBody className="p-0">
					<CAccordion flush alwaysOpen >
						{item.units != null && item.units.length > 0 && item.units.map(u => {
							let max = Math.max(u.carbs, u.fat, u.protein, u.fiber)
							let progress = [
								max <= 0 ? 0 : (u.carbs * 100 / max),
								max <= 0 ? 0 : (u.protein * 100 / max),
								max <= 0 ? 0 : (u.fat * 100 / max),
								max <= 0 ? 0 : (u.fiber * 100 / max),
							]
							return (
								<CAccordionItem itemKey={u.id} >
									<CAccordionHeader >{u.nameFa} | {u.nameEn}</CAccordionHeader>
									<CAccordionBody>
										<CRow className="my-1 justify-content-between" xs={{cols: 'auto'}}>
											<CCol>{`${u.number} ${u.nameFa}`}</CCol>
											<CRow className="justify-content-start align-items-center" xs={{cols:'auto'}}>
												<CCol>
													<CTooltip content="حذف واحد غذایی"><CIcon icon={cilTrash}  onClick={() => onUnitDeleteHandler(u)} /></CTooltip>
												</CCol>
												<CCol>
													<CTooltip content="ویرایش واحد غذایی"><CIcon icon={cilPencil}  onClick={() => onUnitEditHandler(u)} /></CTooltip>
												</CCol>
											</CRow>
										</CRow>
										<CRow className="my-1">
											<CCol xs={3} className="small">کربوهیدرات</CCol>
											<CCol xs={9}>
												<CProgress className="my-1">
													<CProgressBar value={ progress[0] } color="danger">{u.carbs}</CProgressBar>
												</CProgress>
											</CCol>
										</CRow>
										<CRow className="my-1">
											<CCol xs={3} className="small">پروتئین</CCol>
											<CCol xs={9}>
												<CProgress className="my-1">
													<CProgressBar value={ progress[1] } color="primary">{u.protein}</CProgressBar>
												</CProgress>
											</CCol>
										</CRow>
										<CRow className="my-1">
											<CCol xs={3} className="small">چربی</CCol>
											<CCol xs={9}>
												<CProgress className="my-1">
													<CProgressBar value={ progress[2] } color="warning">{u.fat}</CProgressBar>
												</CProgress>
											</CCol>
										</CRow>
										<CRow className="my-1">
											<CCol xs={3} className="small">فیبر</CCol>
											<CCol xs={9}>
												<CProgress className="my-1">
													<CProgressBar value={ progress[3] } color="success">{u.fiber}</CProgressBar>
												</CProgress>
											</CCol>
										</CRow>

									</CAccordionBody>
								</CAccordionItem>
							)
						})}
					</CAccordion>
				</CCardBody>
			</CCard>
		</CCol>
	)
}

export default FoodItemView
