<?php

namespace App\Http\Controllers;

use App\Domain\Request\OrderRequest\OrderRequestAcceptRequest;
use App\Domain\Request\OrderRequest\OrderRequestCancelRequest;
use App\Domain\Request\OrderRequest\OrderRequestCreateRequest;
use App\Domain\Request\OrderRequest\OrderRequestGetRequest;
use App\Unit\Modules\FormatResponse;
use App\UseCase\Interfaces\OrderRequestUseCaseInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Storage;
use SplFileObject;

use function Psy\debug;

class OrderRequestController extends Controller
{
    private OrderRequestUseCaseInterface $use_case;

    public function __construct(OrderRequestUseCaseInterface $use_case)
    {
        $this->use_case = $use_case;
    }

    /**
     * @OA\Post (
     *     path = "/api/v1/master/orderrequest",
     *     operationId = "orderRequestAccept",
     *     tags = {"master"},
     *     summary = "受注ステータス変更",
     *     description = "ICMが受注データのステータスを変更するAPI",
     *     @OA\RequestBody (
     *         required = true,
     *         @OA\JsonContent (
     *             ref="#/components/schemas/OrderRequestAcceptRequest"
     *         )
     *     ),
     *     @OA\Response (
     *         response = 200,
     *         description = "成功",
     *         @OA\JsonContent (
     *             ref="#/components/schemas/SuccessResponse"
     *         )
     *     )
     * )
     *
     * @param OrderRequestAcceptRequest $request
     * @return JsonResponse
     */
    public function accept(OrderRequestAcceptRequest $request): JsonResponse
    {
        $res = $this->use_case->accept($request);

        return FormatResponse::json(["message" => "success", "num" => $res]);
    }
    /**
     * @OA\Post (
     *     path = "/api/v1/order_request/create",
     *     operationId = "orderRequestCreate",
     *     tags = {"order_request"},
     *     summary = "注文",
     *     description = "ICMが受注データのステータスを変更するAPI",
     *     @OA\RequestBody (
     *         required = true,
     *         @OA\JsonContent (
     *             ref="#/components/schemas/OrderRequestAcceptRequest"
     *         )
     *     ),
     *     @OA\Response (
     *         response = 200,
     *         description = "成功",
     *         @OA\JsonContent (
     *             ref="#/components/schemas/SuccessResponse"
     *         )
     *     )
     * )
     *
     * @param OrderRequestCreateRequest $request
     * @return JsonResponse
     */
    public function create(OrderRequestCreateRequest $request): JsonResponse
    {
        $res = $this->use_case->create($request);

        return FormatResponse::json(["messsage" => "success", "id" => $res->id, "ordered_at" => $res->ordered_at]);
    }

    /**
     * @OA\Get (
     *     path = "/api/v1/order_request/get",
     *     operationId = "orderRequestGet",
     *     tags = {"order_request"},
     *     summary = "注文依頼情報取得",
     *     description = "注文依頼情報を取得するAPI",
     *     @OA\Parameter (
     *         ref = "#/components/parameters/order-request-get-id"
     *     ),
     *     @OA\Response (
     *         response = 200,
     *         description = "成功",
     *         @OA\JsonContent (
     *             ref = "#/components/schemas/OrderRequestGetResponse"
     *         )
     *     )
     * )
     *
     * @param OrderRequestGetRequest $request
     * @return JsonResponse
     */
    public function get(OrderRequestGetRequest $request): JsonResponse
    {
        $result = $this->use_case->get($request->input('id'));
        return FormatResponse::json(["data" => $result]);
    }

    /**
     * @OA\Post (
     *     path = "/api/v1/order_request/cancel",
     *     operationId = "orderRequestCancel",
     *     tags = {"order_request"},
     *     summary = "注文依頼キャンセル",
     *     description = "ICMに連携する前の注文依頼をキャンセルするAPI",
     *     @OA\RequestBody (
     *         required = true,
     *         @OA\JsonContent (
     *             ref="#/components/schemas/OrderRequestCancelRequest"
     *         )
     *     ),
     *     @OA\Response (
     *         response = 200,
     *         description = "成功",
     *         @OA\JsonContent (
     *             ref="#/components/schemas/SuccessResponse"
     *         )
     *     )
     * )
     *
     * @param OrderRequestCancelRequest $request
     * @return JsonResponse
     */
    public function cancel(OrderRequestCancelRequest $request): JsonResponse
    {
        $result = $this->use_case->cancel($request->input('id'));
        return FormatResponse::json(['message' => Lang::get('messages.orderRequest.cancelSuccess'), 'request' => $result, 'status' => '連携前キャンセル']);
    }


    public function csvImport(Request $request): JsonResponse
    {
        $filePath = "";
        $cnt = 0;
        $data = [];

        $file = $request->file('csv_file');
        if ($file) {
            $filePath = $file->storeAs('csv', $file->getClientOriginalName());

            if (($handle = fopen(storage_path('app/' . $filePath), 'r')) !== false) {
                while (($csvData = fgetcsv($handle, 1000, ',')) !== false) {
                    if ($cnt > 0) {
                        // ここで$dataを処理する
                        $shohinCd = $csvData[0];
                        $shohinNm = $csvData[1];
                        $suryo = (int)$csvData[2];
                        $makerCd = $csvData[3];
                        $chumonNo = $csvData[4];
                        $tekiyo = $csvData[5];

                        $cartItem = array(
                            'maker_cd' =>
                            $makerCd, 'maker_nm' => $makerCd, 'shohin_cd' => $shohinCd, 'shohin_nm' =>
                            $shohinNm, 'kikaku1' => 'kikaku1-' . $cnt, 'kikaku2' => 'kikaku2-' . $cnt, 'suryo1' => $suryo, 'tani_nm' => '個', 'suryo2' =>
                            $suryo, 'tanka' => $cnt * 100, 'kingaku' => $suryo * $cnt *
                                100, 'kibou_tanka' => $cnt * 100, 'kibou_nouki_ymd' => '', 'cyumon_no' =>
                            $chumonNo, 'nifuda_tekiyo' => $tekiyo, 'tanto_nm' => 'tanto-' . $cnt, 'maker_sum_kbn' => 0, 'suryo1_input_kbn' => 0
                        );

                        $item = array(
                            'line_no' => $cnt, 'validation_result' => ($cnt % 2 != 0) ? true : false, 'validation_error' => ($cnt % 2 != 0) ? null : 'error', 'cart_item' => $cartItem
                        );

                        array_push($data, $item);
                    }
                    $cnt++;
                }
                fclose($handle);
            }
        }

        return FormatResponse::json(["data" => $data]);
    }
}
