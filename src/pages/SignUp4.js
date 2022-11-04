import React, {useState} from 'react';

const SignUp4 = () => {

    const [fileImage, setFileImage] = useState('../assets/image/image_upload-pic.png');
    const saveFileImage = (event) =>{
    // const saveFileImage = (event: React.ChangeEvent<HTMLInputElement>) =>{
        // @ts-ignore
        setFileImage(URL.createObjectURL(event.target.files[0]));
    };
    const deleteFileImage = () =>{
        URL.revokeObjectURL(fileImage);
        setFileImage("");
    };

    return (
        <div className="join profile">
                <h2>프로필 사진 등록</h2>
                <div className="desc__h2">아래를 클릭하여 마음에 드는 사진을 업로드 하세요.</div>

                <div className="join__box">
                    <label className="input__group upload__type">
                        <input
                            className="upload__btn"
                            name="imggeUpload"
                            type="file"
                            accept="image/*"
                            onChange={saveFileImage} />
                            <div className="upload__image">{fileImage && ( <img id="preview" alt="sample" src={fileImage}
                                                                                style={{ margin: "auto" }} /> )}</div>
                    </label>
                </div>

                <div className="btn__box">
                    <div className="btn__group">
                        <a href="join_upload.html" className="btn btn__normal">지금은 넘어가기</a>
                        {/*<a href="join_upload.html" class="btn btn__able">완료</a>*/}
                    </div>
                </div>
            </div>
    )
}

export default SignUp4;