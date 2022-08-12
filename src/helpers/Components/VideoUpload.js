import React, {useState, useEffect} from "react";
import {CCallout, CCol, CContainer, CFormCheck, CFormInput, CFormLabel, CImage, CRow, CSpinner} from "@coreui/react";
import Axios from "../axios/Axios";
import AudioPlayer from "./AudioPlayer";
import ReactPlayer from "react-player/lazy";


export const VideoUpload = ({ onFileUploaded = null, previewUrl=null, calloutClassName="", ...restProps }) => {
	const [selectedFile, setSelectedFile] = useState()
	const [preview, setPreview] = useState("")
	const [isUploading, setIsUploading] = useState(false)
	const [formVisible, setFormVisible] = useState(false)
	const [lastUrl, setLastUrl] = useState(null)

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
		console.log("useEffect -> previewUrl: " + previewUrl + " | -> visible: " + (previewUrl != null && previewUrl.length > 0))
		console.log(previewUrl)
		setPreview(previewUrl)
		setFormVisible(previewUrl != null && previewUrl.length > 0)
		if(previewUrl != null) {
			setLastUrl(previewUrl)
		}
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
				setLastUrl(url)
				if(onFileUploaded) {
					onFileUploaded(url)
				}
			})
			.catch(err => {
				setIsUploading(false)
			})
	}

	const onCheckToggle = () => {
		console.log("onCheckToggle")
		const visible = !formVisible
		console.log(formVisible + " --->" + visible)
		if(!visible) {
			onFileUploaded(null)
		} else if(lastUrl != null && lastUrl.length > 0) {
			onFileUploaded(lastUrl)
		}
		setFormVisible(visible)
	}

	return (
		<CRow className="align-items-end" {...restProps}>
			<CCallout color={"dark"} className={calloutClassName}>
				<CFormCheck
					checked={formVisible}
					onChange={_ => onCheckToggle()}
					label={"فایل ویدئویی"}
				/>
				{formVisible && (
					<CRow className={"mt-1"}>
						<CCol xs={12} className="my-1">
							<ReactPlayer controls width={'100%'} height={preview == null || preview.length === 0 ? 0 : 'auto'} url={preview} />
						</CCol>
						<CCol xs={12} className="my-1">
							{isUploading && (
								<CRow className="m-2 justify-content-start">
									<CCol xs="auto"><CSpinner size="sm" color="dark" /></CCol>
									<CCol xs="auto" className="small">Uploading...</CCol>
								</CRow>
							)}
							<CFormLabel htmlFor="input_file" className={"btn btn-outline-dark w-100"}>انتخاب فایل ویدئویی</CFormLabel>
							<CFormInput id="input_file" type="file"  accept="video/*" className={"visually-hidden"} onChange={onSelectFile} size={"sm"}/>
						</CCol>
					</CRow>
				)}
			</CCallout>
		</CRow>
	)
}

export default VideoUpload