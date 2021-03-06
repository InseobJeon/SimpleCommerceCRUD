import {Inject, Injectable} from '@nestjs/common';
import {Coupon} from "./entities/coupons.entity";
import {CouponDTO, CouponTypeDTO, CouponUUIDDTO, CouponAndCouponUUIDDTO} from "./coupons.dto";

import * as cryptoRandomString from "crypto-random-string";
import { CouponType } from "./entities/couponTypes.entity";
import {CouponUUID} from "./entities/couponUUIDs.entity";
import {AbstractCouponsRepository} from "./coupons.abstract.repository";

export class CouponsRepository extends AbstractCouponsRepository {

    async createCouponUUIDAndCoupon({ couponDTO, couponUUIDDTO }: CouponAndCouponUUIDDTO): Promise<CouponDTO> {
        const createdCouponUUID = await this.createCouponUUID(couponUUIDDTO);
        const couponDTOWithGeneratedUUID = Object.assign(couponDTO, { uuid_id: createdCouponUUID.id })
        return await this.createCoupon(couponDTOWithGeneratedUUID);
    }

    async createCoupon(couponDTO: CouponDTO): Promise<Coupon> {
        const { type_id, uuid_id, used } = couponDTO;
        return await Coupon.create({
            type_id: type_id,
            uuid_id: uuid_id,
            used: used,
        });
    };

    async createCouponType(couponTypeDTO: CouponTypeDTO): Promise<CouponType> {
        const {
            coupon_name,
            discount_type,
            discount_value,
            refundable
        } = couponTypeDTO;
        return await CouponType.create({
            coupon_name: coupon_name,
            discount_type: discount_type,
            discount_value: discount_value,
            refundable: refundable,
        })
    };

    async createCouponUUID(couponUUIDDTO: CouponUUIDDTO): Promise<CouponUUID> {
        const {
            user_id,
            order_id,
        } = couponUUIDDTO;

        return await CouponUUID.create({
            uuid_serial: this.createCouponUUIDSerial(),
            user_id: user_id,
            order_id: order_id,
        });
    };

    async setCouponUsed(id: number) {
        await Coupon.update(
            { used: true },
            { where: { id: id } },
        );
    }

    createCouponUUIDSerial(): string {
        return cryptoRandomString({
            length: 15,
            type: "base64",
        });
    };
}
