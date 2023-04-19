export function Alert(){
    return (
        <div class="z-3 p-2 position-absolute">
            <div class="toast fade show" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="10">
                <div class="toast-header">
                    <svg class="bd-placeholder-img rounded me-2" width="20" height="20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#ff0f0f"></rect></svg>
                    <strong class="me-auto">400: Message</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">
                    Error detail
                </div>
            </div>
            
        </div>
    )
}