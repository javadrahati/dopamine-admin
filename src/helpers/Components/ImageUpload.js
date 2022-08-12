import React, {useState, useEffect} from "react";
import {CCol, CFormInput, CFormLabel, CImage, CRow, CSpinner} from "@coreui/react";
import Axios from "../axios/Axios";

//const DEFAULT_IMAGE_SRC = "https://www.chargeandparking.com/assets/img/default.png";
const DEFAULT_IMAGE_SRC = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDMyIDMyIiBoZWlnaHQ9IjMycHgiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDMyIDMyIiB3aWR0aD0iMzJweCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGcgaWQ9InBpY3R1cmVfaWxsdXN0cmF0aW9uX2Rlc2lnbl9pbWFnZSI+PGc+PHBhdGggZD0iTTMwLjUsMjhoLTI5QzEuMjI0LDI4LDEsMjcuNzc2LDEsMjcuNXYtMjNDMSw0LjIyNCwxLjIyNCw0LDEuNSw0aDI5QzMwLjc3Niw0LDMxLDQuMjI0LDMxLDQuNXYyMyAgICBDMzEsMjcuNzc2LDMwLjc3NiwyOCwzMC41LDI4eiBNMiwyN2gyOFY1SDJWMjd6IiBmaWxsPSIjMjYzMjM4Ii8+PC9nPjxwYXRoIGQ9Ik0yOC41LDI2aC0yM0M1LjIyNCwyNiw1LDI1Ljc3Niw1LDI1LjVTNS4yMjQsMjUsNS41LDI1SDI4VjYuNUMyOCw2LjIyNCwyOC4yMjQsNiwyOC41LDZTMjksNi4yMjQsMjksNi41ICAgdjE5QzI5LDI1Ljc3NiwyOC43NzYsMjYsMjguNSwyNnoiIGZpbGw9IiMyNjMyMzgiLz48cGF0aCBkPSJNMy41LDI2QzMuMjI0LDI2LDMsMjUuNzc2LDMsMjUuNXYtMTlDMyw2LjIyNCwzLjIyNCw2LDMuNSw2aDIzQzI2Ljc3Niw2LDI3LDYuMjI0LDI3LDYuNVMyNi43NzYsNywyNi41LDcgICBINHYxOC41QzQsMjUuNzc2LDMuNzc2LDI2LDMuNSwyNnoiIGZpbGw9IiMyNjMyMzgiLz48cGF0aCBkPSJNMTYuODM0LDI2Yy0yLjU1NywwLTQuMi0yLjAzOC01Ljk0LTQuMTk1QzguOTg5LDE5LjQ0Miw3LjAxOSwxNywzLjY2NiwxN2MtMC4yNzYsMC0wLjUtMC4yMjQtMC41LTAuNSAgIHMwLjIyNC0wLjUsMC41LTAuNWMzLjgzMiwwLDYuMDUsMi43NTEsOC4wMDcsNS4xNzhDMTMuMzI3LDIzLjIyOSwxNC43NTUsMjUsMTYuODM0LDI1YzAuMjc2LDAsMC41LDAuMjI0LDAuNSwwLjUgICBTMTcuMTEsMjYsMTYuODM0LDI2eiIgZmlsbD0iIzI2MzIzOCIvPjxwYXRoIGQ9Ik0xMS42MTIsMjIuMDc3Yy0wLjI3NiwwLTAuNS0wLjIyNC0wLjUtMC41czAuMjI0LTAuNSwwLjUtMC41YzUuMDQ3LDAsNy4wOTMtMi41MjQsOS4wNy00Ljk2NSAgIGMxLjgwMS0yLjIyMywzLjY2NC00LjUyMSw3LjY0Mi00LjYwN2MwLjI3OS0wLjAxLDAuNTA1LDAuMjE0LDAuNTExLDAuNDg5YzAuMDA2LDAuMjc2LTAuMjEzLDAuNTA1LTAuNDg5LDAuNTExICAgYy0zLjUxNCwwLjA3NS01LjA3NywyLjAwNC02Ljg4Niw0LjIzN0MxOS40MzQsMTkuMjQyLDE3LjEzNywyMi4wNzcsMTEuNjEyLDIyLjA3N3oiIGZpbGw9IiMyNjMyMzgiLz48Zz48cGF0aCBkPSJNMTMsMTVjLTEuNjU0LDAtMy0xLjM0Ni0zLTNzMS4zNDYtMywzLTNzMywxLjM0NiwzLDNTMTQuNjU0LDE1LDEzLDE1eiBNMTMsMTBjLTEuMTAzLDAtMiwwLjg5Ny0yLDIgICAgczAuODk3LDIsMiwyczItMC44OTcsMi0yUzE0LjEwMywxMCwxMywxMHoiIGZpbGw9IiMyNjMyMzgiLz48L2c+PC9nPjwvc3ZnPg=="
export const ImageUpload = ({ onFileUploaded = null, previewUrl=null, ...restProps }) => {
	const [selectedFile, setSelectedFile] = useState()
	const [preview, setPreview] = useState(DEFAULT_IMAGE_SRC)
	const [isUploading, setIsUploading] = useState(false)

	// create a preview as a side effect, whenever selected file is changed
	useEffect(() => {
		if (!selectedFile) {
			setPreview(undefined)
			return
		}
		const objectUrl = URL.createObjectURL(selectedFile)
		setPreview(objectUrl)

		// free memory when ever this component is unmounted
		return () => URL.revokeObjectURL(objectUrl)
	}, [selectedFile])

	useEffect(() => {
		setPreview(previewUrl ? previewUrl : DEFAULT_IMAGE_SRC)
		return () => {}
	}, [previewUrl])

	const onSelectFile = e => {
		if (!e.target.files || e.target.files.length === 0) {
			setSelectedFile(undefined)
			return
		}
		const file = e.target.files[0]
		setSelectedFile(file)
		handleUpload(file)
	}

	const handleUpload = (file) => {
		let formData = new FormData();
		formData.append('file', file)
		setIsUploading(true)
		Axios.post('upload', formData)
			.then(res => {
				setIsUploading(false)
				let url = res.data.file || null
				if(onFileUploaded) {
					onFileUploaded(url)
				}
			})
			.catch(err => {
				setIsUploading(false)
			})
	}

	return (
		<CRow className="align-items-end border border-light" {...restProps} >
			<CCol sm={12} md={6} className="my-1">
				<CImage className={"w-100"} src={preview} thumbnail/>
			</CCol>
			<CCol sm={12} md={6} className="my-1">
				{isUploading && (
					<CRow className="m-2 justify-content-start">
						<CCol xs="auto"><CSpinner size="sm" color="dark" /></CCol>
						<CCol xs="auto" className="small">Uploading...</CCol>
					</CRow>
				)}
				<CFormLabel htmlFor="input_file" className={"btn btn-outline-dark w-100"}>انتخاب تصویر</CFormLabel>
				<CFormInput id="input_file" type="file"  accept="image/*" className={"visually-hidden"} onChange={onSelectFile} size={"sm"}/>
			</CCol>
		</CRow>
	)
}

export default ImageUpload