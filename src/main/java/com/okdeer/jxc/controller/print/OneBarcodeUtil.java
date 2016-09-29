
package com.okdeer.jxc.controller.print;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

import org.jbarcode.JBarcode;
import org.jbarcode.encode.Code128Encoder;
import org.jbarcode.paint.BaseLineTextPainter;
import org.jbarcode.paint.WidthCodedPainter;
import org.jbarcode.util.ImageUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * ClassName: OneBarcodeUtil 
 * @Description: 支持EAN13, EAN8, UPCA, UPCE, Code 3 of 9, Codabar, Code 11, Code 93, Code 128, MSI/Plessey, Interleaved 2 of PostNet等 
 * 					利用jbarcode生成各种条形码！测试成功！分享给大家！
 * @author liwb
 * @date 2016年9月17日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */

public class OneBarcodeUtil {

	/**
	 * LOG
	 */
	private static final Logger LOG = LoggerFactory.getLogger(OneBarcodeUtil.class);
	
	/**
	 * 私有构造函数
	 * <p>Title: 私有构造函数</p> 
	 * <p>Description: 增加私有构造函数用以隐藏公开构造函数</p>
	 */
	private OneBarcodeUtil(){
		super();
	}

	/**
	 * @Description: 生成条码公用方法
	 * @param code
	 * @param basePath
	 * @return   
	 * @return String  
	 * @throws
	 * @author yangyq02
	 * @date 2016年9月13日
	 */
	public static String createBarcode(String code, String basePath) {
		String imgPath = "";
		try {
			// 统一生成Code128码
			JBarcode jbcode = new JBarcode(Code128Encoder.getInstance(), WidthCodedPainter.getInstance(),
					BaseLineTextPainter.getInstance());
			BufferedImage img = jbcode.createBarcode(code);
			imgPath = saveToPNG(img, code + ".png", basePath);
		} catch (Exception e) {
			LOG.error("生成条码失败", e);
		}
		return imgPath;
	}

	/**
	 * @Description: 生成PNG图片
	 * @param paramBufferedImage
	 * @param paramString
	 * @param basePath
	 * @return   
	 * @return String  
	 * @throws
	 * @author yangyq02
	 * @date 2016年9月13日
	 */
	private static String saveToPNG(BufferedImage paramBufferedImage, String paramString, String basePath) {
		return saveToFile(paramBufferedImage, paramString, "png", basePath);
	}

	/**
	 * @Description: 保存图片
	 * @param paramBufferedImage
	 * @param imageName
	 * @param imageType
	 * @param basePath
	 * @return   
	 * @return String  
	 * @throws
	 * @author yangyq02
	 * @date 2016年9月13日
	 */
	private static String saveToFile(BufferedImage paramBufferedImage, String imageName, String imageType,
			String basePath) {
		String filePath = "";
		FileOutputStream localFileOutputStream = null;
		try {
			filePath = basePath + "barCode/" + imageName;
			File folder = new File(filePath);
			if (folder != null && !folder.getParentFile().exists()) {
				folder.getParentFile().mkdirs();
			}
			localFileOutputStream = new FileOutputStream(filePath);
			ImageUtil.encodeAndWrite(paramBufferedImage, imageType, localFileOutputStream, 96, 96);
			filePath = "barCode/" + imageName;
		} catch (Exception e) {
			LOG.error("生成条码保存图片:", e);
		} finally {
			try {
				if (localFileOutputStream != null) {
					localFileOutputStream.close();
				}
			} catch (IOException e) {
				LOG.error("流已关闭:", e);
			}
		}
		return filePath;
	}
}