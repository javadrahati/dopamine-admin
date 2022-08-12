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



const BlogItemView = ({ item, onItemEditHandler, onItemDeleteHandler, ...restProps }) => {

	return (
		<CCol className="p-1" lg={6} md={12} {...restProps} >
			<CCard className="h-100">
				<CCardHeader>
					<CRow xs={{gutter: 10}}>
						<CCol xs={4}>
							<CImage height={120} src={item.image || ""} thumbnail/>
						</CCol>
						<CCol xs={8}>
							<CCardText className="m-1"><strong>{item.titleFa}</strong></CCardText>
							<CCardText className="m-1 text-truncate small" >{item.subtitleFa}</CCardText>
							<CRow xs={{cols:'auto'}} className="align-items-center justify-content-start">
									<CBadge color={item.featured ? "primary" : "light"} className="mx-1">برگزیده</CBadge>
									{item.isVideo && <CBadge color="danger" className="mx-1">ویدیو</CBadge>}
									{item.isPodcast && <CBadge color="warning" className="mx-1">پادکست</CBadge>}
							</CRow>
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
							<CAccordionHeader >مدیا</CAccordionHeader>
							<CAccordionBody className="small text-end">
								{item.isPodcast && (
									<AudioPlayer url={item.voice}/>
								)}
								{item.isVideo && (
									<ReactPlayer width={'100%'} url={item.video} controls/>
								)}
							</CAccordionBody>
						</CAccordionItem>
						<CAccordionItem itemKey={10} >
							<CAccordionHeader >عنوان انگلیسی</CAccordionHeader>
							<CAccordionBody className="small text-end">
								{item.titleEn || "------"}
							</CAccordionBody>
						</CAccordionItem>
						<CAccordionItem itemKey={20} >
							<CAccordionHeader >هدر فارسی</CAccordionHeader>
							<CAccordionBody className="small">
								{item.subtitleFa || "------"}
							</CAccordionBody>
						</CAccordionItem>
						<CAccordionItem itemKey={30} >
							<CAccordionHeader>هدر انگلیسی</CAccordionHeader>
							<CAccordionBody className="small text-end">
								{item.subtitleEn || "------"}
							</CAccordionBody>
						</CAccordionItem>
						<CAccordionItem itemKey={40} >
							<CAccordionHeader >متن فارسی</CAccordionHeader>
							<CAccordionBody className="small">
								{item.textFa || "------"}
							</CAccordionBody>
						</CAccordionItem>
						<CAccordionItem itemKey={50} >
							<CAccordionHeader >متن انگلیسی</CAccordionHeader>
							<CAccordionBody className="small text-end text-body">
								{item.textEn || "------"}
							</CAccordionBody>
						</CAccordionItem>
					</CAccordion>
				</CCardBody>
			</CCard>
		</CCol>
	)
}

export default BlogItemView
